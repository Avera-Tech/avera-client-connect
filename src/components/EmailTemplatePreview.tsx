const EmailTemplatePreview = ({
  nomeConvidado = "João Silva",
  nomeRemetente = "Maria Souza",
  linkCadastro = "https://app.avera.com/signup?ref=abc123",
}: {
  nomeConvidado?: string;
  nomeRemetente?: string;
  linkCadastro?: string;
}) => {
  return (
    <div className="bg-muted p-6 rounded-xl max-w-[600px] mx-auto">
      {/* Email container */}
      <div className="bg-background rounded-lg shadow-lg overflow-hidden border border-border">
        {/* Header */}
        <div
          className="px-8 py-6 text-center"
          style={{ background: "hsl(145, 45%, 35%)" }}
        >
          <div className="flex items-center justify-center gap-3 mb-2">
            <svg width="40" height="40" viewBox="0 0 48 43" fill="none">
              <path d="M34.0797 34.9966H43.7688L29.452 3.47073L23.8121 12.8706L34.0797 34.9966Z" fill="#fff"/>
              <path d="M27.5721 0H19.7629L18.1722 3.47073L23.8121 12.8706L29.452 3.47073L28.512 1.73537L27.5721 0Z" fill="#c8f0c8"/>
              <path d="M18.1722 3.47073L4 34.9966L11.5199 26.7536H17.3045L23.8121 12.8706L18.1722 3.47073Z" fill="#d4f5d4"/>
              <path d="M27.8613 34.9966L23.9567 26.7536H17.3045H11.5199L4 34.9966H27.8613Z" fill="#e0fae0"/>
            </svg>
            <span className="text-2xl font-bold text-white tracking-wide">
              AVERA
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="px-8 py-8">
          <h1 className="text-xl font-bold text-foreground mb-4">
            Você foi convidado! 🎉
          </h1>

          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            Olá <span className="font-semibold text-foreground">{nomeConvidado}</span>,
          </p>

          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            <span className="font-semibold text-foreground">{nomeRemetente}</span> convidou
            você para fazer parte da <span className="font-semibold text-primary">Avera</span> — a
            plataforma completa de gestão para centros esportivos.
          </p>

          <p className="text-muted-foreground text-sm leading-relaxed mb-6">
            Com a Avera, você terá acesso a agendamento inteligente, gestão de
            alunos, cobranças automáticas e muito mais. Tudo em um só lugar.
          </p>

          {/* CTA Button */}
          <div className="text-center mb-6">
            <a
              href={linkCadastro}
              className="inline-block px-8 py-3 rounded-lg text-sm font-semibold text-primary-foreground no-underline"
              style={{ backgroundColor: "hsl(145, 45%, 35%)" }}
            >
              Criar minha conta
            </a>
          </div>

          <p className="text-muted-foreground text-xs leading-relaxed mb-4">
            Ou copie e cole este link no seu navegador:
          </p>
          <p className="text-xs text-primary break-all mb-6 bg-muted rounded-md px-3 py-2">
            {linkCadastro}
          </p>

          <hr className="border-border mb-6" />

          <p className="text-muted-foreground text-xs leading-relaxed">
            Se você não esperava este convite, pode ignorar este e-mail com segurança.
          </p>
        </div>

        {/* Footer */}
        <div className="px-8 py-4 bg-muted border-t border-border text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Avera. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmailTemplatePreview;
