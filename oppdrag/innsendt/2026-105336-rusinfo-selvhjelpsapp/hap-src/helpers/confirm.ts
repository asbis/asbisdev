import { alertController, AlertButton } from '@ionic/vue';

type Options = {
    header?: string,
    subHeader?: string,
    message?: string,
    okButtonText?: string,
    cancelButtonText?: string,
    canDismiss?: boolean
}

async function confirm(options: Options): Promise<boolean> {
    options = {
        header: undefined,
        subHeader: undefined,
        message: undefined,
        canDismiss: true,
        okButtonText: 'OK',
        cancelButtonText: 'Avbryt',
        ...options
    }
    const buttons: AlertButton[] = [];
    if (options.canDismiss) {
        buttons.push(
            {
                //@ts-ignore
                text: options.cancelButtonText,
                role: 'cancel',
                handler: () => {
                    status = false;
                },
            });
    }
    buttons.push(
        {
            //@ts-ignore
            text: options.okButtonText,
            role: 'confirm',
            cssClass: 'alertConfirmOKButtonClass',
            handler: () => {
                status = true;
            },
        });

    let status = false;
    const alert = await alertController.create({
        header: options.header,
        subHeader: options.subHeader,
        message: options.message,
        backdropDismiss: options.canDismiss,
        buttons
    });

    await alert.present();
    await alert.onDidDismiss();
    return status;
}

export {
    confirm
}