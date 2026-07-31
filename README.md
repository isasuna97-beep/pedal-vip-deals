# Pedal em Ofertas VIP

Crie uma landing page mobile-first em React + Tailwind para um grupo VIP de ofertas da Shopee, Mercado Livre e Amazon no WhatsApp. O nome do grupo é "Pedal em Ofertas". A página deve ter:

1.Banner superior laranja com texto em branco "PARTICIPE DO GRUPO DE FORMA GRATUITA"

2.Foto de perfil circular com borda, USE A FOTO QUE MANDEI e um ícone de verificação (check) no canto inferior direito

3.Subtítulo em itálico e negrito na primeira linha "Pedal em Ofertas"  e na segunda linha, abaixo desse subtítulo em itálico também "Bikes · Peças · Acessórios · Fitness" essas duas linhas acima da foto de perfil.

4.Título principal grande e bold: "Grupo VIP de Ofertas Secretas"

5.Badge/destaque com borda arredondada: "Chegou a hora de economizar! 💰"

6.Lista de benefícios com ícones de check laranja:

●Cupons Secretos

●Apenas promoções selecionadas

●Pode sair quando quiser

7.Botão CTA laranja arredondado com efeito de pulsar infinito (scale + glow) com texto "ENTRAR NO GRUPO E ECONOMIZAR" que abre um link do WhatsApp

8.Prova social abaixo do botão: "Mais de 30 mil pessoas já economizam todos os dias no grupo"

9.Sistema de notificações fake no canto superior direito que simula pessoas entrando no grupo a cada 4-7 segundos, usando nomes femininos brasileiros aleatórios (ex: "Maria entrou no grupo"), com animação de slide-in e fade-out

10.Paleta de cores: fundo claro, tons de laranja para elementos principais (banner, botão, checks), estilo limpo e minimalista. Espaçamento compacto entre os elementos.

Instale esse código do pixel

<!-- Meta Pixel Code -->

<script>

!function(f,b,e,v,n,t,s)

{if(f.fbq)return;n=f.fbq=function(){n.callMethod?

n.callMethod.apply(n,arguments):n.queue.push(arguments)};

if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';

n.queue=[];t=b.createElement(e);t.async=!0;

t.src=v;s=b.getElementsByTagName(e)[0];

s.parentNode.insertBefore(t,s)}(window, document,'script',

'https://connect.facebook.net/en_US/fbevents.js');

fbq('init', '873260148500543');

fbq('track', 'PageView');

</script>

<noscript><img height="1" width="1" style="display:none"

src="https://www.facebook.com/tr?id=1720076819212350&ev=PageView&noscript=1"

/></noscript>

<!-- End Meta Pixel Code -->

Instale o evento padrão de lead do meta no botão 

<button onclick="fbq('track', 'Lead')>

Link do botão: https://pedalemoferta.lucreshop.com.br/whatsapp/488ZftC

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://pedal-vip-deals.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/500f62d0-353f-484a-b0aa-fec25046b131).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
