<script>

  // to fetch from api
  const matches = [
    {homeTeam: 'France', awayTeam:'Allemagne', stage:'Phase de poule', homeScore: 2, awayScore: 1, date: '2021-06-11', time: '21:00'},
    {homeTeam: 'Espagne', awayTeam:'Italie', stage:'Phase de poule', homeScore: 1, awayScore: 1, date: '2021-07-11', time: '21:00'},
    {homeTeam: 'Brésil', awayTeam:'Argentine', stage:'Phase de poule', homeScore: 2, awayScore: 1, date: '2021-08-11', time: '21:00'},
    {homeTeam: 'Portugal', awayTeam:'Pays-Bas', stage:'Phase de poule', homeScore: 2, awayScore: 1, date: '2021-09-11', time: '21:00'},
    {homeTeam: 'France', awayTeam:'Espagne', stage:'Demi-finale', homeScore: 2, awayScore: 1, date: '2021-10-11', time: '21:00'},
    {homeTeam: 'Brésil', awayTeam:'Portugal', stage:'Demi-finale', homeScore: 2, awayScore: 1, date: '2021-11-11', time: '21:00'},
    {homeTeam: 'France', awayTeam:'Brésil', stage:'Finale', homeScore: 2, awayScore: 1, date: '2021-12-11', time: '21:00'},
    {homeTeam: 'France', awayTeam:'Allemagne', stage:'Phase de poule', homeScore: 2, awayScore: 1, date: '2021-06-11', time: '21:00'},
    {homeTeam: 'Espagne', awayTeam:'Italie', stage:'Phase de poule', homeScore: 1, awayScore: 1, date: '2021-07-11', time: '21:00'},
    {homeTeam: 'Brésil', awayTeam:'Argentine', stage:'Phase de poule', homeScore: 2, awayScore: 1, date: '2021-08-11', time: '21:00'},
    {homeTeam: 'Portugal', awayTeam:'Pays-Bas', stage:'Phase de poule', homeScore: 2, awayScore: 1, date: '2021-09-11', time: '21:00'},
    {homeTeam: 'France', awayTeam:'Espagne', stage:'Demi-finale', homeScore: 2, awayScore: 1, date: '2021-10-11', time: '21:00'},
    {homeTeam: 'Brésil', awayTeam:'Portugal', stage:'Demi-finale', homeScore: 2, awayScore: 1, date: '2021-11-11', time: '21:00'},
    {homeTeam: 'France', awayTeam:'Brésil', stage:'Finale', homeScore: 2, awayScore: 1, date: '2021-12-11', time: '21:00'},
  ]

</script>

<div class="flex flex-col items-center justify-center mb-3 w-full">
  <ul class="w-full">
    {#each matches as match}
      <li class="flex flex-row justify-between w-full gap-5 h-full items-center py-3 shadow-xl px-3">
        <div class="flex flex-row gap-10 justify-start w-1/4 text-xl">
          <p>{match.date}</p>
          <p>{match.time}</p>
        </div>
        <div class="flex flex-row text-2xl gap-5 h-full items-center justify-between w-2/5">
          <p class="w-1/3">{match.homeTeam.toUpperCase()}</p>
          <div class="flex flex-row justify-center gap-5 w-1/5">
            <p class="w-7 bg-col1 text-col4 rounded text-center">{match.homeScore}</p>
            <p class="w-7 bg-col1 text-col4 rounded text-center">{match.awayScore}</p>
          </div>
          <p class="w-1/3 text-right">{match.awayTeam.toUpperCase()}</p>
        </div>
        <div class="flex flex-row justify-end w-1/4">
          <p class="text-xl">{match.stage}</p>
        </div>
      </li>
    {/each}
  </ul>

</div>