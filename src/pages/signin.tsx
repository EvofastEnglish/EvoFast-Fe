"use client";

import {
  borderSolidColor,
  LABEL_SPINING,
  primaryColorButton,
} from "@/utils/constants";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { App as AntdApp, Button, Form, Input, Spin } from "antd";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface SignInFormValues {
  email: string;
  password: string;
}

const Signin: React.FC = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { message } = AntdApp.useApp();

  const [isSpining, setIsSpining] = useState<boolean>(false);

  const onFinish = async (values: SignInFormValues) => {
    setIsSpining(true);
    const res = await signIn("credentials", {
      redirect: false,
      username: values.email,
      password: values.password,
    });
    if (res?.error) {
      setIsSpining(false);
      return message.error(res?.error);
    } else {
      message.success(t("Login successful!"));
      setIsSpining(false);
      return router.push("/");
    }
  };
  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div
          className="rounded-lg shadow md:w-1/4 p-6 pt-0"
          style={{ border: `1px solid ${borderSolidColor}` }}
        >
          <div className="flex items-center justify-center p-7">
            <img src="/images/logo.png" className="h-30" alt="FlowBite Logo" />
          </div>
          <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="email"
              rules={[
                {
                  type: "email",
                  message: t("The input is not valid E-mail!"),
                },
                {
                  required: true,
                  message: t("Please input your E-mail!"),
                },
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder={t("Email")} />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: t("Please input your password!"),
                },
              ]}
              hasFeedback
            >
              <Input.Password
                prefix={<LockOutlined />}
                type="password"
                placeholder={t("Password")}
              />
            </Form.Item>

            <Form.Item>
              <Spin tip={LABEL_SPINING} spinning={isSpining}>
                <Button
                  block
                  htmlType="submit"
                  style={{
                    backgroundColor: `${primaryColorButton}`,
                    color: "#fff",
                  }}
                >
                  {t("Login")}
                </Button>
              </Spin>

              {/* {t("or")}{" "}
              <a onClick={() => router.push("/register")}>
                {t("Register now!")}
              </a> */}
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Signin;
