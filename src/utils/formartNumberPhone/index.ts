/**
 * Currendy Formmat Number Phone
 */

export const formartPhoneNumber = (phoneNumber: string) => {
    // Asegúrate de que el número tenga exactamente 10 dígitos
    if (phoneNumber.length !== 10) {
        throw new Error("El número telefónico debe tener exactamente 10 dígitos.");
    }

    // Formatear el número en el formato XXX-XXX-XXXX
    const formattedNumber = `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6)}`;
    return formattedNumber;
}