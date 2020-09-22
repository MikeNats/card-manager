export const getEnvVar = (env: string, envVarName: string): string => {
  switch(env){
    case 'test': 
      return `REACT_APP_TEST_${envVarName}`
    case 'production': 
      return `REACT_APP_PROD_${envVarName}` 
    default:
      return `REACT_APP_DEV_${envVarName}`
  }
}