import {NOTIFICATION_TYPE, Store} from "react-notifications-component";

type NotifyProps = {
    title: string;
    message: string;
    type: NOTIFICATION_TYPE;
};

export const showNotify = ({title, message, type}: NotifyProps) => {
    Store.addNotification({
        title: title,
        message: message,
        type: type,
        insert: "top",
        container: "bottom-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
            duration: 3500,
            onScreen: true,
        },
    });
};
