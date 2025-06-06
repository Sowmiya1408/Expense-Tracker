import React, { useEffect } from 'react';
import { IonBackButton, IonBadge, IonButton, IonButtons, IonCol, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonPage, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
import './Home.css';
import { set, useForm } from 'react-hook-form';


const Home: React.FC = () => {

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange"
  });
  const [category, setCategory] = React.useState('');
  const [amount, setAmount] = React.useState<any>('');
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [allTransactions, setAllTransactions] = React.useState<any>([]);
  const [balance, setBalance] = React.useState<any>(0);
  const customActionSheetOptions = {
    header: 'Choose a category',
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 1000);
  }, [])


  const saveTrasaction = (data: any) => {
    const newTransaction: any = { category: data.category, amount: data.amount, id: Math.random() * 100, date: (new Date()).toLocaleDateString('en-US') };
    if (category === 'Financial Activity' || category === 'Salary') {
      setBalance(parseFloat((balance + parseFloat(data.amount)).toFixed(2)));
      newTransaction['type'] = 'credit';
    }
    else {
      setBalance(parseFloat((balance - parseFloat(data.amount)).toFixed(2)));
      newTransaction['type'] = 'debit';
    }
    setAllTransactions([...allTransactions, newTransaction]);
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton>Back</IonBackButton>
          </IonButtons>
          <IonTitle>Transactions</IonTitle>
        </IonToolbar>
      </IonHeader>
      {isLoaded ? <IonContent className="ion-padding">
        <div>
          <div className='transaction_header'>Transaction entry</div>
          <form onSubmit={handleSubmit(saveTrasaction)}>
            <IonCol class="left-pad" style={{ 'paddingLeft': '10px' }}>
              <IonSelect
                class="select-category"
                interfaceOptions={customActionSheetOptions}
                interface="action-sheet"
                placeholder="Choose a category"
                onIonChange={(ev) => { setCategory(ev.detail.value) }}
                {...register("category", { required: true })}
              >
                <IonSelectOption value="Financial Activity">Financial Activity</IonSelectOption>
                <IonSelectOption value="Shopping">Shopping</IonSelectOption>
                <IonSelectOption value="Groceries">Groceries</IonSelectOption>
                <IonSelectOption value="Rent">Rent</IonSelectOption>
                <IonSelectOption value="Salary">Salary</IonSelectOption>
              </IonSelect>
              {errors.category && <IonBadge color="danger">Category is required</IonBadge>}
            </IonCol>
            <IonList>
              <IonItem className='amount'>
                <IonInput placeholder="Amount" {...register("amount", { required: true, valueAsNumber: true, validate: (value) => value > 0 })}>
                  <IonButton fill="clear" slot="end" aria-label="Show/hide">
                  </IonButton>
                </IonInput>
                $
              </IonItem>
              {errors.amount && <IonBadge color="danger">{`${errors.amount.type == 'required' ? 'Amount is required' : 'Please Enter correct amount'}`}</IonBadge>}
            </IonList>
            <IonButton size='small' className='saveButton' type='submit'>Save Transaction</IonButton>
          </form>
          <div className='divider'></div>
          <div className='balance'>
            <h1>Balance</h1>
            <h2>{`$ ${balance}`}</h2>
          </div>
          <div className='divider'></div>
          <div className='trasaction-list'>
            {allTransactions.map((item: any) => {
              return (
                <IonItem lines="full" key={item.id}>
                  <IonLabel>
                    <h2>{item.category}</h2>
                    <p>{item.date}</p>
                  </IonLabel>
                  <IonLabel className='amount-label' class={item.type == 'credit' ? 'green' : 'red'}>{`$ ${item.amount}`}</IonLabel>
                </IonItem>
              )
            })}
          </div>
        </div>
      </IonContent> : <IonContent>
        <div className='loading'>Loading...</div>
      </IonContent>}
    </IonPage>
  );
};

export default Home;
