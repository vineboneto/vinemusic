# Aplicativo de Registro de Atividades de Estudo de Instrumentos Musicais

Este aplicativo tem como objetivo registrar atividades de estudo relacionadas a instrumentos musicais, contabilizando o tempo total estudado por mês em minutos. Utilizando Expo, o aplicativo permite o gerenciamento de sessões de estudo e oferece uma autenticação integrada com o Clerk, incluindo login social.

## Dependências

- **Node@20.x**: Runtime Javascript
- **Expo**: Framework para desenvolvimento de aplicativos móveis utilizando React Native.
- **SQLite**: Banco de dados local utilizado para armazenar os registros de atividades de estudo.
- **Clerk**: Serviço de autenticação de usuários, com suporte a login social.

## Como Configurar o Projeto

### Instalar Dependências
Para instalar as dependências do projeto, rode o seguinte comando:

```bash
npm install
```

## Iniciar o App

```bash
npx expo start
```

A partir do output, você terá as seguintes opções para abrir o app:

- Android emulator: Emulador Android.
- iOS simulator: Simulador iOS.
- Expo Go: Um sandbox limitado para desenvolvimento.

## Conectar com Android (SQLite)

Para que o banco de dados SQLite funcione corretamente no Android, é necessário conectar o dispositivo via USB. Siga os passos abaixo:

1.  Ativar Opções de Desenvolvedor e Depuração USB no Android:
      - No dispositivo Android, vá para "Configurações" > "Sobre o Telefone" e toque repetidamente no "Número da Versão" até que as opções de desenvolvedor sejam ativadas.
      - Nas opções de desenvolvedor, ative "Depuração USB".

2. Instalar Android Studio e Configurar ADB:
      - Faça o download e instale o Android Studio.
      - Certifique-se de que o ADB (Android Debug Bridge) está configurado corretamente.
  
3. Verificar Conexão do Dispositivo:
      - Conecte o dispositivo Android ao computador via cabo USB.
      - No terminal, execute o seguinte comando para verificar se o dispositivo foi detectado:
      ```bash
         adb devices
      ```
      Isso exibirá uma lista de dispositivos conectados. Se o seu dispositivo aparecer na lista, ele está pronto para ser usado com o SQLite.
      ```bash
         List of devices attached
         R58M1234567	device
      ```

## Configurações do Clerk

Para integrar a autenticação via Clerk ao aplicativo, siga os passos abaixo para configurar corretamente o login:

1. **Criar uma Conta no Clerk**:
   - Acesse o site do [Clerk](https://clerk.com/).
   - Crie uma nova conta, ou faça login se já possuir uma.

2. **Criar uma Nova Aplicação**:
   - Após o login, clique em `Create Application`.
   - Defina o nome da aplicação como **Vine Music**.

3. **Configurar Opções de Login**:
   - Selecione apenas **Google** como opção em `Signed Options`. Isso limitará o login ao Google para simplificar o processo de autenticação.

4. **Obter a Chave API**:
   - Vá para a aba **Configure**.
   - Selecione **API Keys**.
   - Copie o valor da **Publishable key**.

5. **Configurar a Chave no Projeto**:
   - Crie ou edite o arquivo `.env` na raiz do projeto.
   - Cole a chave que foi copiada, seguindo o formato abaixo:

   ```bash
   EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=<Publishable key>
   ```
   Certifique-se de substituir <Publishable key> pela chave real que você obteve no painel do Clerk.

Esses passos configuram a autenticação com Clerk, permitindo que os usuários façam login via Google no aplicativo.

   
## Funcionalidades

Este aplicativo oferece as seguintes funcionalidades ao usuário:

- **Registrar o tempo de estudo de instrumentos musicais**: O usuário pode adicionar registros de suas sessões de estudo, especificando o tempo dedicado a cada instrumento.
- **Consultar o total de minutos estudados no mês**: O aplicativo calcula e exibe o total de minutos estudados ao longo de cada mês, ajudando o usuário a acompanhar seu progresso.
- **Autenticação via Clerk com suporte a login social (Google)**: O usuário pode se autenticar de forma rápida e segura utilizando a integração com o Clerk, que oferece suporte ao login com Google.

### Funcionalidade Offline

Após a autenticação inicial, o aplicativo funciona totalmente **offline**, já que todos os dados são armazenados localmente no dispositivo utilizando **SQLite**. Isso significa que:
- Os registros de estudo e os cálculos de tempo permanecem acessíveis mesmo sem conexão à internet.
- Os dados são armazenados de forma persistente no próprio dispositivo, garantindo que o usuário possa gerenciar suas atividades de estudo a qualquer momento, independentemente de conectividade.

Essa abordagem oferece maior praticidade ao usuário, permitindo que ele continue utilizando o aplicativo mesmo em ambientes onde a conexão à internet seja limitada ou indisponível.

## Recursos Úteis

- Documentação do Expo: [Expo Documentation](https://docs.expo.dev/)
- SQLite no Expo: [SQLite Expo](https://docs.expo.dev/versions/latest/sdk/sqlite/)
- Clerk Authentication: [Clerk Documentation](https://clerk.com/docs)
