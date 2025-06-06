import { IonBadge, IonButton, IonContent, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonPage } from "@ionic/react";
import './Login.css';
import { useForm } from 'react-hook-form';
import { useState } from "react";
import { eyeOffOutline, eyeOutline } from 'ionicons/icons';

const Login: React.FC = (props: any) => {
  const [showInvalidCredentials, setShowInvalidCredentials] = useState(false);
  const [passwordType, setPasswordType] = useState(true);
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange"
  });

  const login = (data:any) => {
    setShowInvalidCredentials(false);
    const { userId, password } = data;
    if (userId === 'admin' && password === 'Admin@123') {
      console.log('Login success');
      props.history.push('/home');
    }
    else{
      setShowInvalidCredentials(true);
      console.log('Login failed');
    }
  }
  return (
    <IonPage>
        <IonContent class="contanier background">
           <form onSubmit={(e)=> {
            e.preventDefault();  
            handleSubmit(login)();
           }}>
          <div className="container login-div">
            <IonImg class="img-size" src='/piggy-logo.jpeg' />
            <h1 className="header"> BUDGET BUDDY</h1>
            <IonItem className="ion-custom">
              <IonInput label="User ID" labelPlacement="floating" {...register("userId", {required:true})}></IonInput>
            </IonItem>
            { errors.userId &&  <IonBadge color="danger">UserId is required</IonBadge> }
            <IonItem className="ion-custom">
              <IonInput label="Password" type={passwordType ? "password" : "text"} labelPlacement="floating" {...register("password",{required:true})}></IonInput>
              <IonIcon slot="end" style={{"marginBottom":"0px"}} icon={passwordType? eyeOutline :eyeOffOutline} size="small" onClick={() => setPasswordType(!passwordType)}/>
            </IonItem>
            { errors.password &&  <IonBadge color="danger">Password is required</IonBadge> }
            <IonLabel class="remember-me">Need help in logging in ?</IonLabel>
            {showInvalidCredentials && <>
            <div className="invalidCredentials">
            <IonBadge color="danger">The Username or password you entered is Incorrect. </IonBadge>
            </div>
            </> }
            <IonButton className="login" type="submit">LOGIN</IonButton>
            <IonButton className="signup">SIGN UP</IonButton>
          </div>
          </form>
        </IonContent>
    </IonPage>
  );
};

export default Login;
