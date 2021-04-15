import React, {useContext} from "react";
import { UserContext } from "../store/userStore";

const Home = () => {
  const {state} = useContext(UserContext);
  return (
    <>
    <div>
      <h3>ホーム</h3>
      <p>
        ユーザ情報
      </p>
      <ul>
        <li>uid: {state.uid}</li>
        <li>email: {state.email}</li>
      </ul>
      </div>
    </>
  )
}

export default Home;