
import { createContext, useContext, useState } from "react";

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

interface BuyContextType {
    customer: CustomerType;
    card: CardType;
    addBuyer: (customer: CustomerType, card : CardType) => void;
    order: OrderType;
    addOrder: (order: OrderType) => void;
}
export const buyContext = createContext<BuyContextType>({
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
    card: {
        number: 0,
        cvc: 0,
        expDate: "",
        nameOnCard: ""
    },
    order: {
        name: "",
        image: "",
        price: 0,
    },
    addBuyer: () => { },
    addOrder: () => { }
});

export const useBuyContext = (): BuyContextType =>
    useContext(buyContext);


const BuyContextProvider = ({ children }: any) => {

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

    const addOrder = (order: OrderType) => {
        setOrder(order);
    }

    const addBuyer = (customer: CustomerType, card: CardType) => {
        setCustomer(customer);
        setCard(card);
    }

    const buyerContextValue: BuyContextType = {
        order,
        customer,
        card,
        addBuyer,
        addOrder
      };

    return (
        <buyContext.Provider
            value={buyerContextValue}
        >
            {children}
        </buyContext.Provider>
    )
}

export default BuyContextProvider;
