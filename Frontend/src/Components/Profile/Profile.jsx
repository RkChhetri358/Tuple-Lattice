
import { useEffect } from 'react'

export default function Profile() {


useEffect(() => {
  document.body.classList.add("has-transparent-navbar");
  return () => {
    document.body.classList.remove("has-transparent-navbar");
  };
}, []);


  return (
    <div>Profile</div>
  )
}
