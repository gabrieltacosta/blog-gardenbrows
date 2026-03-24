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

          <h2>2. Coleta de Dados e Comentários</h2>
          <p>
            Solicitamos informações pessoais apenas quando realmente precisamos
            delas para lhe fornecer um serviço. Fazemo-lo por meios justos e
            legais, com o seu conhecimento e consentimento. 
          </p>
          <p>
            <strong>Comentários:</strong> Quando os visitantes deixam comentários no blog, 
            coletamos os dados mostrados no formulário de comentários (como nome e e-mail), 
            além do endereço de IP e de dados do navegador do visitante, para auxiliar 
            na detecção de spam.
          </p>

          <h2>3. Política de Cookies</h2>
          <p>
            Utilizamos cookies para melhorar a sua experiência em nosso blog. Você tem o 
            controle sobre quais cookies deseja aceitar através do nosso aviso de privacidade 
            no rodapé do site.
          </p>
          <ul>
            <li><strong>Cookies Essenciais:</strong> São necessários para o funcionamento básico do site, como salvar suas preferências de privacidade ou manter seus dados preenchidos ao deixar comentários consecutivos.</li>
            <li><strong>Cookies Analíticos:</strong> (Ex: Google Analytics) Nos ajudam a entender como você interage com o blog, quais posts são mais lidos e como podemos melhorar nosso conteúdo. Estes só são ativados com o seu consentimento explícito clicando em &#34;Aceitar Todos&#34;.</li>
          </ul>

          <h2>4. Uso e Retenção de Dados</h2>
          <p>
            Apenas retemos as informações coletadas pelo tempo necessário para
            fornecer o serviço solicitado. Se você deixar um comentário, o comentário e os seus 
            metadados são conservados indefinidamente. Fazemos isso para que seja possível reconhecer e aprovar 
            automaticamente quaisquer comentários posteriores ao invés de retê-los numa fila de moderação.
          </p>

          <h2>5. Compartilhamento de Dados</h2>
          <p>
            Não compartilhamos informações de identificação pessoal publicamente
            ou com terceiros, exceto quando exigido por lei ou em casos de ferramentas 
            de detecção automática de spam.
          </p>

          <h2>6. Links Externos</h2>
          <p>
            O nosso site pode ter links para sites externos que não são operados
            por nós. Esteja ciente de que não temos controle sobre o conteúdo e
            práticas desses sites e não podemos aceitar responsabilidade por
            suas respectivas políticas de privacidade.
          </p>

          <h2>7. Seu Consentimento</h2>
          <p>
            Você é livre para recusar a nossa solicitação de informações
            pessoais e uso de cookies, entendendo que talvez não possamos fornecer alguns dos
            serviços desejados, como a publicação de comentários.
          </p>

          <h2>8. Alterações na Política de Privacidade</h2>
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