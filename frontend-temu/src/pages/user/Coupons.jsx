import './UserDashboard.css';
import DashBoard from '../../layouts/DashBoard';
import { useContext, useState } from 'react';
import { IoTicketOutline } from 'react-icons/io5';
import { verifyCoupon } from '../../API/Coupon.API';
import { UserContext } from '../../provider/UserContext';

const Coupons = () => {
    const [couponCode, setCouponCode] = useState('');
    const [couponMessage, setCouponMessage] = useState('');
    const [couponDiscount, setCouponDiscount] = useState(null);

    const { userData } = useContext(UserContext);

    const handleCoupon = async () => {
        if (couponCode) {
            const res = await verifyCoupon(userData.id, couponCode);
            setCouponMessage(res.message);
            setCouponDiscount(res.discount);
        }
    };

    return (
        <DashBoard>
            <section className="user-dashboard-container">
                <form
                    action=""
                    className="input-coupon"
                    onSubmit={e => e.preventDefault()}
                >
                    <input
                        type="code"
                        placeholder="Ingresa el código del cupón"
                        value={couponCode}
                        onChange={e => setCouponCode(e.target.value)}
                    />

                    <button type="submit" onClick={handleCoupon}>
                        Aplicar
                    </button>
                </form>

                <div className="dashboard-empty">
                    <IoTicketOutline size={128} />

                    {!couponMessage && <p>Verifica el estado de tu cupón</p>}
                    {couponMessage && <p>{couponMessage}</p>}
                    {couponDiscount !== null && (
                        <p>Descuento: {couponDiscount}</p>
                    )}
                </div>
            </section>
        </DashBoard>
    );
};

export default Coupons;
