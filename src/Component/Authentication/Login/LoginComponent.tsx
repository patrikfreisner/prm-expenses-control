import { useLoginContext } from '../../../Context/LoginContext'

export const LoginComponent = () => {
    const { authenticate } = useLoginContext();

    const logIn = () => {
        authenticate("patrikfr.nx@gmail.com", "@Tst12345", null);
    }

    const logIn2 = () => {
        authenticate("lilliavitoria@gmail.com", "@Tst12345", null);
    }

    return (
        <>
            <div>LoginComponent</div>
            <button type='button' onClick={logIn}>
                Login
            </button>
        </>
    )
}
