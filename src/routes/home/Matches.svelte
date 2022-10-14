<script>
  import { formatDate, formatTime } from '$lib/utils/time';

  // to fetch from api
  const matches = [
    { homeTeam: 'France', awayTeam: 'Allemagne', stage: 'Phase de poule', time: 1665096637081, homeScore: 2, awayScore: 1 },
    { homeTeam: 'Espagne', awayTeam: 'Italie', stage: 'Phase de poule', time: 1665096637081, homeScore: 1, awayScore: 1 },
    { homeTeam: 'Brésil', awayTeam: 'Argentine', stage: 'Phase de poule', time: 1665096637081, homeScore: 2, awayScore: 1 },
    { homeTeam: 'Portugal', awayTeam: 'Pays-Bas', stage: 'Phase de poule', time: 1665096637081, homeScore: 2, awayScore: 1 },
    { homeTeam: 'France', awayTeam: 'Espagne', stage: 'Demi-finale', time: 1665196637081, homeScore: 2, awayScore: 1 },
    { homeTeam: 'Brésil', awayTeam: 'Portugal', stage: 'Demi-finale', time: 1665296637081, homeScore: 2, awayScore: 1 },
    { homeTeam: 'France', awayTeam: 'Brésil', stage: 'Finale', time: 1665396637081, homeScore: 2, awayScore: 1 },
    { homeTeam: 'France', awayTeam: 'Allemagne', stage: 'Phase de poule', time: 1665496637081 },
    { homeTeam: 'Espagne', awayTeam: 'Italie', stage: 'Phase de poule', time: 1665596637081 },
    { homeTeam: 'Brésil', awayTeam: 'Argentine', stage: 'Phase de poule', time: 1665696637081 },
    { homeTeam: 'Portugal', awayTeam: 'Pays-Bas', stage: 'Phase de poule', time: 1665796637081 },
    { homeTeam: 'France', awayTeam: 'Espagne', stage: 'Demi-finale', time: 1665896637081 },
    { homeTeam: 'Brésil', awayTeam: 'Portugal', stage: 'Demi-finale', time: 1665996637081 },
    { homeTeam: 'France', awayTeam: 'Brésil', stage: 'Finale', time: 1666096637081 },
  ];
</script>

<div class="flex flex-col items-center justify-center mb-3 w-full">
  <ul class="w-[95%] flex flex-col gap-3 pt-4">
    {#each matches as match}
      <li class="flex flex-row justify-between w-full gap-5 h-full items-center py-3 shadow-xl border px-3">
        <div class="flex flex-row gap-10 justify-between w-1/4 text-lg pr-24">
          <p>{formatDate(match.time)}</p>
          <p>{formatTime(match.time)}</p>
        </div>
        <div class="flex flex-row text-2xl gap-5 h-full items-center justify-between w-2/5">
          <p class="w-1/3">{match.homeTeam.toUpperCase()}</p>
          <div class="flex flex-row justify-center gap-5 w-1/5">
            <p class="w-7 bg-col1 text-col4 rounded text-center">{match.homeScore ? match.homeScore : ''}</p>
            <p class="w-7 bg-col1 text-col4 rounded text-center">{match.awayScore ? match.awayScore : ''}</p>
          </div>
          <p class="w-1/3 text-right">{match.awayTeam.toUpperCase()}</p>
        </div>
        <div class="flex flex-row justify-end w-1/4">
          <p class="text-lg">{match.stage}</p>
        </div>
      </li>
    {/each}
  </ul>
</div>
