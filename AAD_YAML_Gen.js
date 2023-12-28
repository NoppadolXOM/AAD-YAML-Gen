function generateYAML() {
  err = validate("txtAKV", "Azure Key Vault Name is a required field\n")
      + validate("txtMngIdName", "Managed Identity Name is a required field\n")
      + validate("txtMngIdClientID", "Managed Identity Client ID is a required field\n")
      + validate("txtMngIdResourceID", "Managed Identity Resource ID is a required field\n")
      + validate("txtNamespace", "ARO Namespace is a required field\n");
  if (err) {
    alert(err);
    return;
  }

  document.getElementById("txtSecretProviderClass").focus();
  document.getElementById("txtSecretProviderClass").value  = generateYAML_SecretProviderClass();
  document.getElementById("txtAzureIdentity").value        = generateYAML_AzureIdentityAndBinding();
  document.getElementById("txtTestPod").value              = generateYAML_TestPod();
  return;
}

function validate(id,errMsg){
  txtElement = document.getElementById(id);
  if (txtElement.value) {
    txtElement.parentElement.parentElement.classList.remove("em-has-error");
    return "";
  } else {
    txtElement.parentElement.parentElement.classList.add("em-has-error");
    return errMsg;
  };
}

function generateYAML_SecretProviderClass_objectArray(secretName) {
  txtSecretName = document.getElementById(secretName).value;
  if (!txtSecretName) {
    return "";
  }
  
  objType = 'secret';
  output = 
`
        - |
          objectName: `+txtSecretName+`
          objectType: `+objType+`
          objectVersion: ""`;
  return output;
}

function generateYAML_SecretProviderClass_secretObject(secretName,envName) {
  txtSecretName = document.getElementById(secretName).value;
  if (!txtSecretName) {
    return "";
  }
  
  output = `
        - key: `+txtSecretName+`
          objectName: `+txtSecretName
  ;
  return output;
}

function generateYAML_SecretProviderClass() {
  txtAKV = document.getElementById("txtAKV").value.toLowerCase();
  txtNamespace = document.getElementById("txtNamespace").value;

  objectArray_part = generateYAML_SecretProviderClass_objectArray("secret_name1")
                   + generateYAML_SecretProviderClass_objectArray("secret_name2")
                   + generateYAML_SecretProviderClass_objectArray("secret_name3")
                   + generateYAML_SecretProviderClass_objectArray("secret_name4");

  secretObject_part = generateYAML_SecretProviderClass_secretObject("secret_name1","env_name1")
                    + generateYAML_SecretProviderClass_secretObject("secret_name2","env_name2")
                    + generateYAML_SecretProviderClass_secretObject("secret_name3","env_name3")
                    + generateYAML_SecretProviderClass_secretObject("secret_name4","env_name4");
  output = 
`apiVersion: secrets-store.csi.x-k8s.io/v1
kind: SecretProviderClass
metadata:
  name: `+txtAKV+`-spc
  namespace: `+txtNamespace+`
spec:
  provider: azure
  parameters:
    usePodIdentity: 'true'
    useVMManagedIdentity: 'false'
    userAssignedIdentityID: ""
    keyvaultName: "`+txtAKV+`"
    objects: |
      array:`+objectArray_part+`
    tenantId: "d1ee1acd-bc7a-4bc4-a787-938c49a83906"
  secretObjects:
    - secretName: `+txtAKV+`-s
      type: Opaque
      data:`+secretObject_part
  ;
  return output;
}

function generateYAML_AzureIdentityAndBinding() {
  txtMngIdName       = document.getElementById("txtMngIdName").value.toLowerCase();
  txtMngIdClientID   = document.getElementById("txtMngIdClientID").value;
  txtMngIdResourceID = document.getElementById("txtMngIdResourceID").value;
  txtNamespace       = document.getElementById("txtNamespace").value;
  output = 
`apiVersion: "aadpodidentity.k8s.io/v1"
kind: AzureIdentity
metadata:
  name: `+txtMngIdName+`
  namespace: `+txtNamespace+`
spec:
  type: 0
  clientID: `+txtMngIdClientID+`
  resourceID: `+txtMngIdResourceID+`
---
apiVersion: "aadpodidentity.k8s.io/v1"
kind: AzureIdentityBinding
metadata:
  name: `+txtMngIdName+`-binding
  namespace: `+txtNamespace+`
spec:
  azureIdentity: `+txtMngIdName+`
  selector: `+txtMngIdName
;
  return output;
}

function generateYAML_TestPod_env(secretName,envName,aroSecretName) {
  txtSecretName = document.getElementById(secretName).value;
  if (!txtSecretName) {
    return "";
  }
  
  txtEnvName = document.getElementById(envName).value;
  if (!txtEnvName) {
    txtEnvName = txtSecretName;
  }

  output = `
      - name: `+txtEnvName.replace('-','_').replace('.','_').toUpperCase()+`
        valueFrom:
          secretKeyRef:
            name: `+aroSecretName+`
            key: `+txtSecretName
  ;
  return output;
}

function generateYAML_TestPod() {
  txtAKV = document.getElementById("txtAKV").value.toLowerCase();
  txtNamespace = document.getElementById("txtNamespace").value;  
  txtMngIdName = document.getElementById("txtMngIdName").value.toLowerCase();

  env_part = generateYAML_TestPod_env("secret_name1","env_name1",txtAKV+"-s")
           + generateYAML_TestPod_env("secret_name2","env_name2",txtAKV+"-s")
           + generateYAML_TestPod_env("secret_name3","env_name3",txtAKV+"-s")
           + generateYAML_TestPod_env("secret_name4","env_name4",txtAKV+"-s");

  output = 
`kind: Pod
apiVersion: v1
metadata:
  name: busybox-secrets-store-inline
  namespace: `+txtNamespace+`
  labels:
    aadpodidbinding: `+txtMngIdName+`
spec:
  containers:
  - name: busybox
    image: k8s.gcr.io/e2e-test-images/busybox:1.29
    command:
      - "/bin/sleep"
      - "10000"
    volumeMounts:
    - name: secrets-store-inline
      mountPath: "/mnt/secrets-store"
      readOnly: true
    env:`+env_part+`
  volumes:
    - name: secrets-store-inline
      csi:
        driver: secrets-store.csi.k8s.io
        readOnly: true
        volumeAttributes:
          secretProviderClass: `+txtAKV+`-spc`
;
  return output;
}