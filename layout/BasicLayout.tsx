import { localStorageService } from "@/utils/localstorage";
import { Button, Layout, theme } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";

interface Props {
  content: ReactNode;
}

const BasicLayout: React.FC<Props> = (prop) => {
  const { content } = prop;
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { t } = useTranslation();
  const router = useRouter();

  const clearLocalStorage = () => {
    localStorageService.clear();
  };
  return (
    <Layout className="h-screen flex">
      <Header
        style={{ background: "#fff" }}
        className="flex justify-between items-center"
      >
        <div className="flex items-center h-16">
          <img
            src="/images/logo.png"
            className="max-h-16 object-contain mr-3 cursor-pointer"
            alt="FlowBite Logo"
            onClick={() => router.push("/home")}
          />
        </div>
        <Button
          onClick={() => {
            signOut();
            clearLocalStorage();
          }}
        >
          {t("Logout")}
        </Button>
      </Header>
      <Content
        style={{ background: colorBgContainer }}
        className="flex-1 overflow-auto"
      >
        <div>{content}</div>
      </Content>
      {/* <Footer className="flex justify-center">Footer</Footer> */}
    </Layout>
  );
};

export default BasicLayout;
