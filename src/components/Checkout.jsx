import './Checkout.css'

export const Checkout = () => {
    return (
        // Stolem From
        // https://codepen.io/stephan281094/pen/XQRpQm
        <div class="container">
            <h1>Envío</h1>
            <p>Detallanos donde queres recibir los productos...</p>
            <hr />
            <div class="form">
                <div class="fields fields--2">
                    <label class="field">
                        <span
                            class="field__label"
                            for="firstname">Nombre/s
                        </span>
                        <input 
                            class="field__input"
                            type="text"
                            id="firstname" 
                            value="John"
                        />
                    </label>
                    <label class="field">
                        <span
                            class="field__label"
                            for="lastname"
                        > Apellido</span>
                        <input 
                            class="field__input"
                            type="text"
                            id="lastname"
                            value="Doe"
                        />
                    </label>
                </div>
                <label class="field">
                    <span 
                        class="field__label"
                        for="address">Dirección</span>
                    <input
                        class="field__input"
                        type="text"
                        id="address"
                    />
                </label>

                <div class="fields fields--3">
                    <label class="field">
                    <span
                        class="field__label"
                        for="zipcode"
                    >Código Postal</span>
                    <input
                        class="field__input"
                        type="text"
                        id="zipcode"
                    />
                    </label>
                    <label class="field">
                    <span
                        class="field__label"
                        for="city"
                    >Ciudad</span>
                    <input
                        class="field__input"
                        type="text"
                        id="city"
                    />
                    </label>
                    <label class="field">
                        <span
                            class="field__label"
                            for="state"
                        >Provincia</span>
                        <select
                            class="field__input"
                            id="state">
                            <option value=""></option>
                        </select>
                    </label>
                </div>
            </div>
            <button class="button"
            >Continue</button>
        </div>
    );
};
