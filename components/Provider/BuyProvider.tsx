
import { createContext, useContext, useState } from "react";
import { CustomerType } from "types/customer";
import { OrderType } from "types/order";
interface BuyContextType {
    customer: CustomerType;
    setCustomer: (customer: CustomerType) => void;
    order: OrderType;
    setOrder: (order: OrderType) => void;
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
    order: {
        name: "",
        image: "",
        price: 0,
    },
    setCustomer: () => { },
    setOrder: () => { }
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

    const [order, setOrder] = useState<OrderType>({
        name: "",
        image: "",
        price: 0,
    });

    const buyerContextValue: BuyContextType = {
        order,
        customer,
        setCustomer,
        setOrder
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
