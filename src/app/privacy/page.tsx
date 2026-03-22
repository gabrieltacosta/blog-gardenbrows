import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Conheça nossa política de privacidade.",
};

export default function PrivacyPage() {
  return (
    <div className="bg-garden-dark min-h-screen text-garden-text py-32 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="font-serif text-5xl md:text-7xl font-light">
            Política de Privacidade
          </h1>
        </header>
        <div className="prose prose-invert prose-garden max-w-none">
          <h2>1. Introdução</h2>
          <p>
            A sua privacidade é importante para nós. É política do Garden Brows
            Studio respeitar a sua privacidade em relação a qualquer informação
            sua que possamos coletar no site{" "}
            <Link href="https://blog.gardenbrows.com.br">Garden Brows Studio</Link>, e
            outros sites que possuímos e operamos.
          </p>

          <h2>2. Coleta de Dados</h2>
          <p>
            Solicitamos informações pessoais apenas quando realmente precisamos
            delas para lhe fornecer um serviço. Fazemo-lo por meios justos e
            legais, com o seu conhecimento e consentimento. Também informamos
            por que estamos coletando e como será usado.
          </p>

          <h2>3. Uso de Dados</h2>
          <p>
            Apenas retemos as informações coletadas pelo tempo necessário para
            fornecer o serviço solicitado. Quando armazenamos dados, protegemos
            dentro de meios comercialmente aceitáveis para evitar perdas e
            roubos, bem como acesso, divulgação, cópia, uso ou modificação não
            autorizados.
          </p>

          <h2>4. Compartilhamento de Dados</h2>
          <p>
            Não compartilhamos informações de identificação pessoal publicamente
            ou com terceiros, exceto quando exigido por lei.
          </p>

          <h2>5. Links Externos</h2>
          <p>
            O nosso site pode ter links para sites externos que não são operados
            por nós. Esteja ciente de que não temos controle sobre o conteúdo e
            práticas desses sites e não podemos aceitar responsabilidade por
            suas respectivas políticas de privacidade.
          </p>

          <h2>6. Seu Consentimento</h2>
          <p>
            Você é livre para recusar a nossa solicitação de informações
            pessoais, entendendo que talvez не possamos fornecer alguns dos
            serviços desejados.
          </p>

          <h2>7. Alterações na Política de Privacidade</h2>
          <p>
            O uso continuado de nosso site será considerado como aceitação de
            nossas práticas em torno de privacidade e informações pessoais. Se
            você tiver alguma dúvida sobre como lidamos com dados do usuário e
            informações pessoais, entre em contato conosco.
          </p>

          <p>Esta política é efetiva a partir de 21 de Março de 2026.</p>
        </div>
      </div>
    </div>
  );
}
