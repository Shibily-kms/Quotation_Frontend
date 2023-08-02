import React, { useEffect } from 'react';
import Header from '../../components/header/Header';
import FirstPage from '../../components/first-page/First_page'
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Home() {
  const { user } = useSelector((state) => state.userAuth)
  const [searchParams] = useSearchParams();
  
  useEffect(() => {
    const id = searchParams.get('id');
    if (!id && user._id) {
      window.location.href = `https://www.sales.alliancewatersolutions.com?id=${user._id}`
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <div className="header-div">
        <Header />
      </div>

      <div className="first-page-div">
        <FirstPage />
      </div>
    </div>
  )
}

export default Home