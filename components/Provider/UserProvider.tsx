import { createContext, useState, useContext } from "react"

interface AddressType {
  address1: string;
  address2: string;
  city: string;
  state: string;
  zipCode: string;
}

interface CustomerType {
  name: string;
  lastname: string;
  email: string;
  address: AddressType;
}

interface CardType {
  number: number;
  cvc: number;
  expDate: string;
  nameOnCard: string;
}

interface OrderType {
  name: string;
  image: string;
  price: number;
}


interface UserContextType {
  customer: CustomerType;
  setCustomer: (customer: CustomerType) => void;
  card: CardType;
  setCard: (card: CardType) => void;
  order: OrderType;
  setOrder: (order: OrderType) => void;
}

export const userContext = createContext<UserContextType>({
  customer: {
    name: "",
    lastname: "",
    email: "",
    address: {
      address1: "",
      address2: "",
      city: "",
      state: "",
      zipCode: ""
    }
  },
  setCustomer: () => { },
  card: {
    number: 0,
    cvc: 0,
    expDate: "",
    nameOnCard: ""
  },
  setCard: () => { },
  order: {
    name: "",
    image: "",
    price: 0,
  },
  setOrder: () => { },
});

export const useUserContext = (): UserContextType =>
  useContext(userContext);


export function UserProvider({ children }: any) {
  const [customer, setCustomer] = useState<CustomerType>({
    name: "",
    lastname: "",
    email: "",
    address: {
      address1: "",
      address2: "",
      city: "",
      state: "",
      zipCode: "",
    },
  });

  const [card, setCard] = useState<CardType>({
    number: 0,
    cvc: 0,
    expDate: "",
    nameOnCard: "",
  });

  const [order, setOrder] = useState<OrderType>({
    name: "",
    image: "",
    price: 0,
  });

  const userContextValue: UserContextType = {
    customer,
    setCustomer,
    card,
    setCard,
    order,
    setOrder,
  };


  return (
    <userContext.Provider value={userContextValue}>
        {children}
    </userContext.Provider>
  );
}