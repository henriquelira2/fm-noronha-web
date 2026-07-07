import {
  CalendarDays,
  ExternalLink,
  Heart,
  Info,
  Pause,
  Play,
  Radio,
  Share2,
  Star,
  Volume2,
} from 'lucide-react';
import type { CSSProperties } from 'react';
import { useMemo, useState } from 'react';

import backgroundImage from './assets/fm-noronha-background.jpg';
import coverArt from './assets/fm-noronha-cover-art.png';
import crabImage from './assets/noronha-crab-detail.jpg';
import islandImage from './assets/noronha-island-extra.jpg';
import turtleImage from './assets/noronha-sea-turtle-wide.jpg';
import underwaterImage from './assets/noronha-underwater-vertical.jpg';
import { AppModal } from './components/AppModal';
import { LiveBadge } from './components/LiveBadge';
import { WaveformVisualizer } from './components/WaveformVisualizer';
import {
  ABOUT_TEXT,
  CREDITS,
  INDEPENDENT_PROGRAMS,
  PLAY_STORE_URL,
  RADIO_FREQUENCY,
  SOCIAL_BUTTONS,
  WEEKLY_PROGRAMMING,
} from './data/radio';
import {
  getTransmissionColor,
  getTransmissionLabel,
  getTransmissionStatus,
} from './data/transmission';
import { useRadioPlayer } from './hooks/useRadioPlayer';

type ModalName = 'schedule' | 'share' | 'rate' | 'about' | null;

const pageUrl = 'https://fm-noronha.local';

function ProgramRow({ meta, title }: { meta: string; title: string }) {
  return (
    <article className="program-row">
      <span>{meta}</span>
      <strong>{title}</strong>
    </article>
  );
}

function SocialLinks() {
  return (
    <div className="social-grid">
      {SOCIAL_BUTTONS.map((button) => (
        <a
          key={button.label}
          className="social-link"
          href={button.url}
          rel="noreferrer"
          style={{ '--social-color': button.color } as CSSProperties}
          target="_blank"
        >
          <span>{button.label.slice(0, 1)}</span>
          {button.label}
          <ExternalLink size={13} />
        </a>
      ))}
    </div>
  );
}

function ScheduleContent() {
  return (
    <div className="schedule-content">
      <div className="schedule-hero">
        <img src={turtleImage} alt="" />
        <img className="schedule-hero__badge" src={crabImage} alt="" />
        <div>
          <h3>Programacao da Radio</h3>
          <p>Acompanhe os horarios da FM Noronha</p>
        </div>
      </div>

      <div className="program-section">
        <h3>Programacao Semanal</h3>
        {WEEKLY_PROGRAMMING.map((item) => (
          <ProgramRow key={`${item.time}-${item.program}`} meta={item.time} title={item.program} />
        ))}
      </div>

      <div className="program-section">
        <h3>Programas Independentes</h3>
        {INDEPENDENT_PROGRAMS.map((item) => (
          <ProgramRow
            key={`${item.day}-${item.time}-${item.program}`}
            meta={`${item.day} | ${item.time}`}
            title={item.program}
          />
        ))}
      </div>
    </div>
  );
}

function AboutContent() {
  return (
    <div className="about-content">
      <img className="about-content__image" src={islandImage} alt="Fernando de Noronha" />
      <div className="about-card">
        <span>FM NORONHA</span>
        <h3>O som do paraiso</h3>
        <p>{ABOUT_TEXT}</p>
      </div>
      <div className="credits-list">
        <h3>Versao 2 - 31/05/2025</h3>
        {CREDITS.map(([role, name]) => (
          <div key={`${role}-${name}`} className="credit-row">
            <span>{role}</span>
            <strong>{name}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const player = useRadioPlayer();
  const [activeModal, setActiveModal] = useState<ModalName>(null);
  const [shareMessage, setShareMessage] = useState('Compartilhe a FM Noronha com quem ama a ilha.');

  const status = getTransmissionStatus({
    isLoading: player.isLoading,
    isOffline: Boolean(player.statusMessage),
  });
  const statusLabel = getTransmissionLabel(status);
  const statusColor = getTransmissionColor(status);

  const modalTitle = useMemo(() => {
    switch (activeModal) {
      case 'schedule':
        return 'Programacao';
      case 'share':
        return 'Compartilhar';
      case 'rate':
        return 'Avaliar';
      case 'about':
        return 'Sobre';
      default:
        return '';
    }
  }, [activeModal]);

  const togglePlayPause = () => {
    if (player.isLoading) {
      return;
    }

    if (player.isPlaying) {
      player.pause();
    } else {
      void player.play();
    }
  };

  const shareRadio = async () => {
    const shareData = {
      title: 'FM Noronha',
      text: 'Ouça a FM Noronha 96.9 ao vivo de Fernando de Noronha.',
      url: window.location.href || pageUrl,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        setShareMessage('Compartilhamento aberto pelo navegador.');
        return;
      }

      await navigator.clipboard.writeText(shareData.url);
      setShareMessage('Link copiado para a area de transferencia.');
    } catch {
      setShareMessage('Nao foi possivel compartilhar agora. Copie o endereco do navegador.');
    }
  };

  return (
    <main className="app-shell" style={{ '--hero-image': `url(${backgroundImage})` } as CSSProperties}>
      <div className="app-shell__scrim" />
      <header className="topbar">
        <a className="brand" href="#inicio" aria-label="FM Noronha inicio">
          <span className="brand-mark">
            <span>FM</span>
            <span className="brand-wave" />
          </span>
          <span className="brand-subtitle">
            NORONHA
            <small>96.9 FM</small>
          </span>
        </a>
        <nav aria-label="Navegacao principal">
          <a className="nav-active" href="#player">
            <Radio size={17} />
            Ao vivo
          </a>
          <button type="button" onClick={() => setActiveModal('schedule')}>
            <CalendarDays size={17} />
            Programacao
          </button>
          <button type="button" onClick={() => setActiveModal('about')}>
            <Info size={17} />
            Sobre
          </button>
        </nav>
      </header>

      <section className="hero-grid" id="inicio">
        <div className="hero-copy layout-hero-copy">
          <h1>O som do paraiso</h1>
          <p>Ao vivo de Fernando de Noronha, com musica, informacao e a energia da ilha.</p>
        </div>

        <div className="left-stage">
          <section className="player-card" id="player" aria-labelledby="player-title">
            <div className="cover-stage">
              <div className="cover-ring" />
              <img src={coverArt} alt="FM Noronha" />
            </div>
            <div className="player-main">
              <LiveBadge label={statusLabel} dotColor={statusColor} />
              <div className="frequency-line">
                <strong>{RADIO_FREQUENCY}</strong>
                <span>FM</span>
              </div>
              <h2 id="player-title">Radio Ao Vivo</h2>
              <WaveformVisualizer active={player.isPlaying || player.isLoading} />
              {player.statusMessage ? <p className="status-message">{player.statusMessage}</p> : null}
            </div>
            <div className="player-controls">
              <button
                className="play-button"
                type="button"
                aria-label={player.isPlaying ? 'Pausar radio' : 'Tocar radio'}
                disabled={player.isLoading}
                onClick={togglePlayPause}
              >
                {player.isLoading ? <span className="loader" /> : player.isPlaying ? <Pause size={30} /> : <Play size={30} />}
              </button>
              <Volume2 size={24} />
              <div className="volume-track" aria-hidden="true">
                <span />
              </div>
            </div>
          </section>

          <div className="action-bar" aria-label="Acoes da radio">
            <button type="button" onClick={() => setActiveModal('rate')}>
              <Heart size={25} />
              <span>Favoritar</span>
            </button>
            <button type="button" onClick={() => setActiveModal('share')}>
              <Share2 size={24} />
              <span>Compartilhar</span>
            </button>
            <button type="button" onClick={() => setActiveModal('schedule')}>
              <CalendarDays size={24} />
              <span>Programacao</span>
            </button>
            <button type="button" onClick={() => setActiveModal('about')}>
              <Info size={24} />
              <span>Sobre a radio</span>
            </button>
          </div>
        </div>

        <aside className="side-panel" aria-label="Programacao">
          <div className="compact-panel schedule-panel">
            <div className="panel-heading">
              <h2>
                <CalendarDays size={22} />
                Programacao
              </h2>
              <button type="button" onClick={() => setActiveModal('schedule')}>
                Ver tudo
              </button>
            </div>
            {WEEKLY_PROGRAMMING.map((item) => (
              <ProgramRow key={`${item.time}-${item.program}`} meta={item.time} title={item.program} />
            ))}
          </div>
        </aside>
      </section>

      <section className="lower-band" aria-label="Resumo da radio">
        <article className="lower-copy">
          <strong>A ilha, sua musica, sua radio.</strong>
          <p>Musica, noticias, entrevistas e agenda cultural em uma experiencia direta para escutar no navegador.</p>
        </article>
        <article className="image-tile">
          <img src={underwaterImage} alt="Mar de Fernando de Noronha" />
        </article>
        <article className="image-tile">
          <img src={islandImage} alt="Ilha em Fernando de Noronha" />
        </article>
        <article className="image-tile">
          <img src={turtleImage} alt="Vida marinha de Fernando de Noronha" />
        </article>
      </section>

      <AppModal title={modalTitle} open={activeModal !== null} onClose={() => setActiveModal(null)}>
        {activeModal === 'schedule' ? <ScheduleContent /> : null}
        {activeModal === 'about' ? <AboutContent /> : null}
        {activeModal === 'share' ? (
          <div className="simple-modal">
            <Share2 size={34} />
            <p>{shareMessage}</p>
            <button className="primary-action" type="button" onClick={() => void shareRadio()}>
              <Share2 size={18} />
              Compartilhar radio
            </button>
            <SocialLinks />
          </div>
        ) : null}
        {activeModal === 'rate' ? (
          <div className="simple-modal">
            <Star size={36} />
            <p>Gostando do app? Nos ajude avaliando na Play Store.</p>
            <a className="primary-action" href={PLAY_STORE_URL} rel="noreferrer" target="_blank">
              <Star size={18} />
              Avaliar
            </a>
          </div>
        ) : null}
      </AppModal>
    </main>
  );
}
