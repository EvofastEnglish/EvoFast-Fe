/* eslint-disable @next/next/no-img-element */
"use client";

import { ApiErrorResponse, RegisterFormValues } from "@/model/user";
import authService from "@/services/user";
import {
    borderSolidColor,
    LABEL_SPINING,
    primaryColorButton,
} from "@/utils/constants";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { App as AntdApp, Button, Form, Input, Spin } from "antd";
import { AxiosError } from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const Register: React.FC = () => {
    const router = useRouter();
    const { t } = useTranslation();
    const { message } = AntdApp.useApp();
    const [form] = Form.useForm();

    const [isSpining, setIsSpining] = useState<boolean>(false);
    // const passwordPattern =
    //     /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[{\]};:'",<.>/?\\|`~]).{6,}$/;

    const onFinish = async (values: RegisterFormValues) => {
        setIsSpining(true);

        try {
            // Chuẩn hóa user info
            const username = values.email.split("@")[0].toUpperCase();
            const payload = {
                ...values,
                firstName: username,
                lastName: username,
                username: username,
            };

            // Gọi API
            const response = await authService.register(payload);

            if (response.isSuccess) {
                form.resetFields();
                message.success(t("Registration successful"));
                await autoLogin(values.email, values.password);
                return; // Early exit
            }

            // Nếu API không isSuccess
            message.error(t("Registration error"));

        } catch (err: unknown) {
            // Safe error handling
            const axiosErr = err as AxiosError<ApiErrorResponse>;
            const data = axiosErr.response?.data;

            const msg =
                data?.detail ||
                data?.title ||
                axiosErr.message ||
                t("Registration error");

            message.error(msg);
        } finally {
            setIsSpining(false);
        }
    };

    const autoLogin = async (email: string, password: string) => {
        setIsSpining(true);

        try {
            const res = await signIn("credentials", {
                redirect: false,
                username: email,
                password: password,
            });

            if (res?.error) {
                message.error(res.error);
                return;
            }
            router.push("/");
        } catch (err: unknown) {
            const axiosErr = err as AxiosError<ApiErrorResponse>;
            const data = axiosErr.response?.data;

            const msg =
                data?.detail ||
                data?.title ||
                axiosErr.message ||
                "ログインに失敗しました。";
            message.error(msg);
        } finally {
            setIsSpining(false);
        }
    };


    return (
        <div className="flex items-center justify-center min-h-screen">
            <div
                className="rounded-lg shadow md:w-1/4 p-6 pt-0"
                style={{ border: `1px solid ${borderSolidColor}` }}
            >
                <div className="flex items-center justify-center p-7">
                    <img src="/images/logo.png" className="h-30" alt="FlowBite Logo" />
                </div>

                <Form name="register" layout="vertical" onFinish={onFinish} form={form}>
                    <Form.Item
                        name="email"
                        label={t("Email")}
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

                    {/* <Form.Item
                        name="firstName"
                        label={t("First name")}
                        rules={[
                            {
                                required: true,
                                message: t("Please input your firstName"),
                            }
                        ]}
                    >
                        <Input placeholder={t("First name")}
                        />
                    </Form.Item>

                    <Form.Item
                        name="lastName"
                        label={t("Last name")}
                        rules={[
                            {
                                required: true,
                                message: t("Please input your lastName"),
                            }
                        ]}
                    >
                        <Input placeholder={t("Last name")}
                        />
                    </Form.Item>

                    <Form.Item
                        name="username"
                        label={t("User name")}
                        rules={[
                            {
                                required: true,
                                message: t("Please input your username"),
                            }
                        ]}
                    >
                        <Input placeholder={t("User name")}
                        />
                    </Form.Item> */}

                    <Form.Item
                        name="password"
                        label={t("Password")}
                        rules={[
                            {
                                required: true,
                                message: t("Please input your password!"),
                            }
                            // ,
                            // {
                            //     pattern: passwordPattern,
                            //     message: t(
                            //         "alert_format_value"
                            //     ),
                            // },
                        ]}
                        hasFeedback
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            placeholder={t("Password (e.g. P@ssword123)")}
                        />
                    </Form.Item>


                    <Form.Item
                        name="confirmPassword"
                        label={t("Confirm Password")}
                        dependencies={["password"]}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: t("Please confirm your password"),
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue("password") === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(
                                        new Error(t("The two passwords do not match"))
                                    );
                                },
                            }),
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            placeholder={t("Re-enter your password")}
                        />
                    </Form.Item>

                    <Form.Item>
                        <Spin tip={LABEL_SPINING} spinning={isSpining}>
                            <Button
                                block
                                htmlType="submit"
                                style={{
                                    backgroundColor: primaryColorButton,
                                    color: "#fff",
                                    fontWeight: 500,
                                }}
                            >
                                {t("Register")}
                            </Button>
                        </Spin>
                    </Form.Item>

                    <div className="text-center text-sm mt-3">
                        {t("Already have an account")}{" "}
                        <a
                            onClick={() => router.push("/signin")}
                            className="text-blue-600 hover:underline cursor-pointer"
                        >
                            {t("Login now")}
                        </a>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default Register;
