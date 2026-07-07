export const RADIO_FREQUENCY = '96.9';

export const RADIO_STREAM_URL =
  import.meta.env.VITE_RADIO_STREAM_URL || 'https://8136.brasilstream.com.br/stream';

export const PLAY_STORE_URL =
  'https://play.google.com/store/apps/details?id=com.atdefn.FM.Noronha';

export const RADIO_CONNECTION_ERROR =
  'Nao foi possivel conectar a radio no momento. Verifique sua internet ou tente novamente mais tarde.';

export const SOCIAL_BUTTONS = [
  {
    label: 'Facebook',
    color: '#3b5998',
    url: 'https://www.facebook.com/tvgolfinho/',
  },
  {
    label: 'WhatsApp',
    color: '#25d366',
    url: 'https://wa.me/5581994883168',
  },
  {
    label: 'X',
    color: '#1da1f2',
    url: 'https://x.com/TvGolfinhoNoron?t=ofIpMIGN-BkabqsFsFAR6Q&s=08',
  },
  {
    label: 'Instagram',
    color: '#C13584',
    url: 'https://www.instagram.com/sistemagolfinho.noronha/',
  },
  {
    label: 'YouTube',
    color: '#da0c0c',
    url: 'https://www.youtube.com/c/SistemaGolfinhodeComunica%C3%A7%C3%A3o',
  },
  {
    label: 'Spotify',
    color: '#1DB954',
    url: 'https://open.spotify.com/show/22X6bcFzCGPVh9HHDWr8FK?si=BxVk1rlhSteCWilDOLwdmA',
  },
] as const;

export const WEEKLY_PROGRAMMING = [
  { time: '8h45', program: 'Reprise do Jornal da Ilha' },
  { time: '9h', program: 'Momentos de Alegria (Pedro Ribeiro)' },
  { time: '12h', program: 'Pernambuco Esportivo (Radio Sei)' },
  { time: '13h', program: 'Pernambuco no Radio (Radio Sei)' },
  { time: '14h', program: 'Balaio de Gato (Thania Brito)' },
  { time: '19h', program: 'Jornal da Ilha (Karlilian Magalhaes e Karol Vieira)' },
] as const;

export const INDEPENDENT_PROGRAMS = [
  { day: 'Segunda-feira', time: '18h', program: 'Momentos com Cristo' },
  { day: 'Terca-feira', time: '18h', program: 'A Caminho da Luz' },
  { day: 'Quarta-feira', time: '19h30', program: 'Quarta Onda (Virginia Anghinoni)' },
  { day: 'Quinta-feira', time: '10h30', program: 'Momento da Gestao' },
  { day: 'Quinta-feira', time: '18h', program: 'Voz que Liberta' },
  { day: 'Quinta-feira', time: '20h', program: 'Pernambuco Cultural' },
  { day: 'Sexta-feira', time: '18h', program: 'Rei Jesus' },
  { day: 'Sexta-feira', time: '19h', program: 'B do Rock (Rafael Robles)' },
  { day: 'Sexta-feira', time: '22h', program: 'Alma Leve (Elo Araujo)' },
] as const;

export const ABOUT_TEXT =
  'O FM Noronha leva ate voce o melhor da ilha de Fernando de Noronha: noticias, musicas, entrevistas e agenda cultural em uma experiencia feita para acompanhar a energia da ilha.';

export const CREDITS = [
  ['Administrador Geral Adjunto', 'Sr. Virgilio de Almeida Ignacio de Oliveira'],
  ['Gerencia de Comunicacao', 'Lea Renata Melo de Medeiros'],
  ['Assessor de Comunicacao', 'Domingos Savio de Godoy'],
  ['Superintendente Administrativo, Financeiro e TI', 'Eliandro Rafael Torres Ferreira'],
  ['Gerencia de T.I', 'Ari Alves de Lucena'],
  ['Desenvolvedor', 'Henrique Lira da Silva'],
  ['Desenvolvedor e Analista de Dados', 'Raimundo Marcelo Nogueira Coimbra'],
] as const;
