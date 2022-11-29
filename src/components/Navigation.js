import {useEffect, useState} from "react";

function Navigation() {
    const [IsLogin, setIsLogin] = useState(0);
    const [User, setUser] = useState('');
    const [UserType, setUserType] = useState('');
    const [IsScroll, setIsScroll] = useState(0);

    useEffect(() => {
        if(sessionStorage.getItem('ct-accessToken')){
            setIsLogin(1);
            // 로그인 정보 getMe() 호출하여 user set
        }
        setUserType('user');
        setUser('choheejin');
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }

    }, []);

    const handleScroll = () => {
        const scrollPosition = window.pageYOffset;
        console.log(scrollPosition);
        if(scrollPosition === 0 ){
            setIsScroll(0);
        } else {
            setIsScroll(1);
        }
    };

    return(
        <div className={`${IsScroll === 1 ? 'sticky top-0 z-50 bg-white drop-shadow' : ''} w-full flex justify-center mb-2`}>
            <div className="flex justify-between items-center w-[75%] py-4 px-2">
                <a href="/" className="flex items-center gap-4">
                    <img className="w-9 h-9 cursor-pointer" src={process.env.REACT_APP_PUBLIC_URL + '/logo.png'}/>
                    <div className="cursor-pointer font-bold text-gray-700 flex text-3xl font-cute">컴퓨터사세요</div>
                </a>
                <div>
                    {
                        IsLogin === 0 ?
                            <div className="flex gap-4">
                                <a className="cursor-pointer" href={UserType === 'admin' ? '/my-page/admin' : `/my-page/user/${User}`} > {User}</a>
                                <a className="cursor-pointer" href={'/posts/'+User}>내 장바구니</a>
                                <a className="cursor-pointer" href="">주문 배송 조회</a>
                            </div>
                            :
                            <a href="/login">로그인 하기</a>
                    }
                </div>
            </div>
        </div>
    );
}

export default Navigation;