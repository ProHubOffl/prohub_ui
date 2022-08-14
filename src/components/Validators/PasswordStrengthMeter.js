import React from 'react';
import zxcvbn from 'zxcvbn';
import "../../Style/PasswordStrengthMeter.css"
const PasswordStrengthMeter = ({ password }) => {
  const testResult = zxcvbn(password);
  const num = testResult.score * 100/4;

  const createPassLabel = () => {
      if(password.length === 0) {
          return '';
      } else if(password.length < 8){
          return 'Password must be contain 8 characters';
      } else {
        switch(testResult.score) {
            case 0:
              return 'Very weak';
            case 1:
              return 'Weak';
            case 2:
              return 'Medium';
            case 3:
              return 'Good';
            case 4:
              return 'Strong';
            default:
              return '';
          }
      }
  }

  const funcProgressColor = () => {
    if(password.length<8){
        return 'red';
      } else {
         switch(testResult.score) {
            case 0:
              return '#EA9590';
            case 1:
              return '#EA1111';
            case 2:
              return '#FFAD00';
            case 3:
              return '#9bc158';
            case 4:
              return '#00b500';
            default:
              return 'none';
          }
      }
  }

  const changePasswordColor = () => ({
    width: `${num}%`,
    background: funcProgressColor(),
    height: '7px'
  })

  return (
    <>
      <div className="progress" style={{height:'7px'}}>
        {
          (password.length>8)?
          <div className="progress-bar" style={changePasswordColor()}></div>
          :
          ''
        }  
      </div>
      <div className='progresslabel'>
        <p style={{ color: funcProgressColor()}}>{createPassLabel()}</p>
      </div>
    </>
  )
}

export default PasswordStrengthMeter