import { useState, useEffect } from "react";
import {
  Button,
  Form,
  Input,
  Row,
  Col,
  Checkbox,
  notification,
  Spin,
} from "antd";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleLogin } from "../../../Redux/Actions";
import axios from "axios";

let myStyle = {
  container: {
    padding: "3em 9em",
  },
  main: { height: "83vh", overflow: "hidden", borderRadius: "10px" },
};

const LoginNew = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.persistedReducer);

  const [api, contextHolder] = notification.useNotification();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = () => {
    if (selector.isLogin) {
      navigate("/");
    }
  };

  const openNotificationWithIcon = (type) => {
    if (type === "error") {
      api[type]({
        message: "Invalid Email or Password",
        description: "",
      });
    } else {
      api[type]({
        message: "Login Successful",
        description: "",
      });
    }
  };

  const handleSubmit = (values) => {
    console.log(values);
    setLoading(true);
    axios
      .post("http://localhost:5000/login", values)
      .then((res) => {
        setLoading(false);
        if (res.data.length === 0) {
          openNotificationWithIcon("error");
        } else {
          let data = res.data[0];

          dispatch(
            handleLogin({
              id: data._id,
              f_name: data.f_name,
              l_name: data.l_name,
            })
          );
          openNotificationWithIcon("success");
          navigate("/");
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <Spin spinning={loading}>
        {contextHolder}
        <div style={myStyle.container}>
          <Row style={myStyle.main}>
            <Col span={12} style={{ backgroundColor: "#f6f7fc" }}>
              <div>
                <div className="loginFormContainer">
                  <div className="loginTitleDiv">
                    <div>
                      <span className="loginTitle">Welcome To Dashboard!</span>
                    </div>
                    <div>
                      <span className="loginSubTitle">
                        Please enter your email and password to login
                      </span>
                    </div>
                  </div>
                  <div className="loginForm">
                    <Form
                      name="basic"
                      layout="vertical"
                      initialValues={{
                        remember: true,
                      }}
                      onFinish={handleSubmit}
                      onFinishFailed={onFinishFailed}
                      autoComplete="off"
                    >
                      <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                          {
                            type: "email",
                            message: "The input is not valid E-mail!",
                          },
                          {
                            required: true,
                            message: "Please input your E-mail!",
                          },
                        ]}
                        hasFeedback
                      >
                        <Input
                          className="myAntIpt"
                          placeholder="Enter your email"
                        />
                      </Form.Item>

                      <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                          {
                            required: true,
                            message: "Please input your password!",
                          },
                        ]}
                      >
                        <Input.Password
                          className="myAntIpt"
                          placeholder="Enter Your password"
                        />
                      </Form.Item>

                      <Form.Item name="remember" valuePropName="checked">
                        <div className="remenberAndFrgotPassContainer">
                          <div>
                            <Checkbox>Remember me</Checkbox>
                          </div>
                          <div>
                            {/* <a Link="forgotPassword">Forgot Password?</a> */}
                            <Link to="/forgotPassword">Forgot Password?</Link>
                          </div>
                        </div>
                      </Form.Item>

                      <Form.Item>
                        <Button
                          className="myAntLoginBtn"
                          type="primary"
                          htmlType="submit"
                          block
                        >
                          Submit
                        </Button>
                      </Form.Item>
                    </Form>
                  </div>
                </div>
              </div>
            </Col>
            <Col span={12}>
              <img src="./images/loginRightImg.png" style={{ width: "100%" }} />
            </Col>
          </Row>
        </div>
      </Spin>
    </div>
  );
};

export default LoginNew;
