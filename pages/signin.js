import { useRouter } from "next/router";
import { useState } from "react";
import style from "../styles/form.module.css";

import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { FaCircleNotch } from "react-icons/fa";
import extra from "../styles/extra.module.css";
import Link from "next/link";
import { BASE_URL } from "@/Api";
import axios from "axios";

function Signin() {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
    loding: false,
    error: false,
  });

  ////////////handle form data////////////

  const handlechange = (name) => (event) => {
    setUserInfo({ ...userInfo, [name]: event.target.value });
  };

  ///////////shandle show password/////////////
  const [showPassword, setShowPassword] = useState(false);
  const handleShow = () => {
    setShowPassword(!showPassword);
  };

  ////////////////////////handle submit////////////
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (userInfo.name == "" || userInfo.password === "") {
      setError(true);
      return;
    }
    setError(false);
    setUserInfo({ ...userInfo, loding: true });

    const { username, password } = userInfo;
    console.log(`${BASE_URL}/signin`);
    axios
      .post(`${BASE_URL}/signin`, {
        username: username,
        password: password,
      })
      .then((res) => {
        setUserInfo({ ...userInfo, loding: false });

        localStorage.setItem("user", JSON.stringify(res.data));
        router.push("/");
      })
      .catch((error) => {
        setUserInfo({ ...userInfo, error: true, loding: false });
      });
  };

  return (
    <div className={style.container}>
      <section className={style.section}>
        <div className={style.form}>
          <div className={style.text_section}>
            <h3>Welcome !</h3>
            <h2>Sign in to</h2>
            <p>lorem ipsume is simple</p>
          </div>
          <form>
            <label htmlFor="usename">User Name</label>
            <input
              id="username"
              type={"text"}
              placeholder="Enter your user name"
              value={userInfo.name}
              onChange={handlechange("username")}
            />
            <label htmlFor="password">Password</label>

            <div className={style.password_input}>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your Password"
                value={userInfo.password}
                onChange={handlechange("password")}
              />

              {showPassword ? (
                <AiFillEye onClick={handleShow} className={style.icon} />
              ) : (
                <AiFillEyeInvisible
                  onClick={handleShow}
                  className={style.icon}
                />
              )}
            </div>
            
            {error && <p style={{ color: "red" }}>All field require</p>}
            {userInfo.error && (
              <p style={{ color: "red" }}>
                Username or password is not correct
              </p>
            )}
            <button onClick={handleSubmit}>
              {userInfo.loding ? (
                <FaCircleNotch className={extra.loding} />
              ) : (
                "Login"
              )}
            </button>

            <p className={style.foot_p}>
              {`Don't have an Account?`}
              <Link className={style.foot_link} href={"/signup"}>
                Register
              </Link>
            </p>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Signin;
