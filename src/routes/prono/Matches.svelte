<script>
    import { formatDate, formatTime, isPassed } from "$lib/utils/time";




  // to fetch from api
  const matches = [
    {homeTeam: 'France', awayTeam:'Allemagne', stage:'Phase de poule', time:1665096637081, homeScore: 2, awayScore: 1, odds:[1.51, 2.95, 3.95]},
    {homeTeam: 'Espagne', awayTeam:'Italie', stage:'Phase de poule', time: 1665096637081, homeScore: 1, awayScore: 1 ,odds:[1.51, 2.95, 3.95]},
    {homeTeam: 'Brésil', awayTeam:'Argentine', stage:'Phase de poule', time: 1665096637081, homeScore: 2, awayScore: 1 ,odds:[1.51, 2.95, 3.95]},
    {homeTeam: 'Portugal', awayTeam:'Pays-Bas', stage:'Phase de poule', time: 1665096637081, homeScore: 2, awayScore: 1 ,odds:[1.51, 2.95, 3.95]},
    {homeTeam: 'France', awayTeam:'Espagne', stage:'Demi-finale', time: 1665196637081, homeScore: 2, awayScore: 1 ,odds:[1.51, 2.95, 3.95]},
    {homeTeam: 'Brésil', awayTeam:'Portugal', stage:'Demi-finale', time: 1665296637081, homeScore: 2, awayScore: 1 ,odds:[1.51, 2.95, 3.95]},
    {homeTeam: 'France', awayTeam:'Brésil', stage:'Finale', time: 1665396637081, homeScore: 2, awayScore: 1 ,odds:[1.51, 2.95, 3.95]},
    {homeTeam: 'France', awayTeam:'Allemagne', stage:'Phase de poule', time: 1665496637081 ,odds:[1.51, 2.95, 3.95]},
    {homeTeam: 'Espagne', awayTeam:'Italie', stage:'Phase de poule', time: 1665596637081 ,odds:[1.51, 2.95, 3.95]},
    {homeTeam: 'Brésil', awayTeam:'Argentine', stage:'Phase de poule', time: 1665696637081 ,odds:[1.51, 2.95, 3.95]},
    {homeTeam: 'Portugal', awayTeam:'Pays-Bas', stage:'Phase de poule', time: 1665796637081 ,odds:[1.51, 2.95, 3.95]},
    {homeTeam: 'France', awayTeam:'Espagne', stage:'Demi-finale', time: 1665896637081 ,odds:[1.51, 2.95, 3.95]},
    {homeTeam: 'Brésil', awayTeam:'Portugal', stage:'Demi-finale', time: 1665996637081 ,odds:[1.51, 2.95, 3.95]},
    {homeTeam: 'France', awayTeam:'Brésil', stage:'Finale', time: 1666096637081 ,odds:[1.51, 2.95, 3.95]},
  ]

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
            <input type="text" class="w-7 bg-col1 text-col4 rounded text-center" placeholder={match.homeScore ? match.homeScore.toString() : "..."} disabled={isPassed(match.time)}/>
            <input type="text" class="w-7 bg-col1 text-col4 rounded text-center" placeholder={match.awayScore ? match.awayScore.toString() : "..."} disabled={isPassed(match.time)} />
          </div>
          <p class="w-1/3 text-right">{match.awayTeam.toUpperCase()}</p>
        </div>
        <div class="flex flex-row justify-end w-1/4 gap-5">
          <p class="text-lg">{match.stage}</p>
          <div class="flex flex-row gap-1">
            {#each match.odds as odd}
              <p class="text-xl border-2">{odd}</p>
            {/each}
          </div>
        </div>
      </li>
    {/each}
  </ul>
</div>