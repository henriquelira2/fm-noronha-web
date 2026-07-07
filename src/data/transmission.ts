export type TransmissionStatus = 'loading' | 'offline' | 'recorded' | 'live';

export function getTransmissionStatus({
  isLoading,
  isOffline,
  date = new Date(),
}: {
  isLoading: boolean;
  isOffline: boolean;
  date?: Date;
}): TransmissionStatus {
  if (isLoading) {
    return 'loading';
  }

  if (isOffline) {
    return 'offline';
  }

  const dayOfWeek = date.getDay();
  return dayOfWeek === 0 || dayOfWeek === 6 ? 'recorded' : 'live';
}

export function getTransmissionLabel(status: TransmissionStatus) {
  switch (status) {
    case 'loading':
      return 'CARREGANDO';
    case 'offline':
      return 'OFFLINE';
    case 'recorded':
      return 'GRAVADO';
    case 'live':
      return 'AO VIVO';
  }
}

export function getTransmissionColor(status: TransmissionStatus) {
  switch (status) {
    case 'loading':
      return '#00ffff';
    case 'offline':
      return '#ffb4ab';
    case 'recorded':
      return '#c0cab0';
    case 'live':
      return '#ff3b30';
  }
}
