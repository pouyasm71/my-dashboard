/* ============================================================
   DATA — Mock data for all dashboard pages
   ============================================================ */

const DATA = {

  pending: [
    { id:'KYC-2041', name:'James Harrington',  country:'🇬🇧 United Kingdom', submitted:'08 Apr 2026', docs:'Passport, PoA',          risk:'Low',    status:'pending' },
    { id:'KYC-2040', name:'Amira El-Sayed',    country:'🇦🇪 UAE',            submitted:'08 Apr 2026', docs:'National ID, Bank Stmt',  risk:'Medium', status:'pending' },
    { id:'KYC-2039', name:'Stefan Müller',     country:'🇩🇪 Germany',        submitted:'07 Apr 2026', docs:'Passport, PoA',           risk:'Low',    status:'pending' },
    { id:'KYC-2038', name:'Yuki Tanaka',       country:'🇯🇵 Japan',          submitted:'07 Apr 2026', docs:'Passport, Source Funds',  risk:'Low',    status:'review'  },
    { id:'KYC-2037', name:'Dmitri Volkov',     country:'🇷🇺 Russia',         submitted:'06 Apr 2026', docs:'Passport, Bank Stmt',     risk:'High',   status:'review'  },
    { id:'KYC-2036', name:'Priya Sharma',      country:'🇮🇳 India',          submitted:'06 Apr 2026', docs:'National ID, PoA',        risk:'Low',    status:'pending' },
    { id:'KYC-2035', name:'Carlos Mendez',     country:'🇲🇽 Mexico',         submitted:'05 Apr 2026', docs:'Passport, PoA',           risk:'Medium', status:'pending' },
    { id:'KYC-2034', name:'Fatima Al-Rashidi', country:'🇸🇦 Saudi Arabia',   submitted:'05 Apr 2026', docs:'National ID, Bank Stmt',  risk:'Medium', status:'review'  },
    { id:'KYC-2033', name:'Liu Wei',           country:'🇨🇳 China',          submitted:'04 Apr 2026', docs:'Passport, Source Funds',  risk:'High',   status:'review'  },
    { id:'KYC-2032', name:'Sophie Dubois',     country:'🇫🇷 France',         submitted:'04 Apr 2026', docs:'Passport, PoA',           risk:'Low',    status:'pending' },
  ],

  approved: [
    { id:'KYC-2031', name:'Thomas Eriksson',   country:'🇸🇪 Sweden',    approved:'07 Apr 2026', officer:'Pouya SM', risk:'Low',    type:'Standard' },
    { id:'KYC-2030', name:'Nadia Kowalski',    country:'🇵🇱 Poland',    approved:'07 Apr 2026', officer:'Pouya SM', risk:'Low',    type:'Premium'  },
    { id:'KYC-2029', name:'Ahmed Hassan',      country:'🇪🇬 Egypt',     approved:'06 Apr 2026', officer:'Pouya SM', risk:'Medium', type:'Standard' },
    { id:'KYC-2028', name:'Maria Gonzalez',    country:'🇪🇸 Spain',     approved:'06 Apr 2026', officer:'Pouya SM', risk:'Low',    type:'VIP'      },
    { id:'KYC-2027', name:'Ravi Patel',        country:'🇮🇳 India',     approved:'05 Apr 2026', officer:'Pouya SM', risk:'Low',    type:'Standard' },
    { id:'KYC-2026', name:'Anna Novikova',     country:'🇷🇺 Russia',    approved:'05 Apr 2026', officer:'Pouya SM', risk:'Medium', type:'Standard' },
    { id:'KYC-2025', name:'Leo Fernandez',     country:'🇧🇷 Brazil',    approved:'04 Apr 2026', officer:'Pouya SM', risk:'Low',    type:'Premium'  },
    { id:'KYC-2024', name:'Hana Yamamoto',     country:'🇯🇵 Japan',     approved:'04 Apr 2026', officer:'Pouya SM', risk:'Low',    type:'Standard' },
    { id:'KYC-2023', name:'Elsa Bergström',    country:'🇸🇪 Sweden',    approved:'03 Apr 2026', officer:'Pouya SM', risk:'Low',    type:'VIP'      },
    { id:'KYC-2022', name:'Omar Al-Rashid',    country:'🇦🇪 UAE',       approved:'03 Apr 2026', officer:'Pouya SM', risk:'Medium', type:'Premium'  },
    { id:'KYC-2021', name:'Chen Jing',         country:'🇭🇰 Hong Kong', approved:'02 Apr 2026', officer:'Pouya SM', risk:'Low',    type:'VIP'      },
    { id:'KYC-2020', name:'Julia Schneider',   country:'🇩🇪 Germany',   approved:'02 Apr 2026', officer:'Pouya SM', risk:'Low',    type:'Standard' },
  ],

  rejected: [
    { id:'KYC-2019', name:'Viktor Sokolov',     country:'🇷🇺 Russia',  rejected:'08 Apr 2026', reason:'Sanctions list match',    risk:'High',   resubmit:'No'  },
    { id:'KYC-2018', name:'Unknown Entity LLC', country:'🇧🇿 Belize',  rejected:'07 Apr 2026', reason:'Incomplete documents',     risk:'High',   resubmit:'Yes' },
    { id:'KYC-2017', name:'Michael Okafor',     country:'🇳🇬 Nigeria', rejected:'06 Apr 2026', reason:'Expired ID document',      risk:'Medium', resubmit:'Yes' },
    { id:'KYC-2016', name:'Zhao Lei',           country:'🇨🇳 China',   rejected:'05 Apr 2026', reason:'PEP screening failure',    risk:'High',   resubmit:'No'  },
    { id:'KYC-2015', name:'Sara Al-Farsi',      country:'🇮🇷 Iran',    rejected:'05 Apr 2026', reason:'Restricted jurisdiction',  risk:'High',   resubmit:'No'  },
    { id:'KYC-2014', name:'Ivan Petrov',        country:'🇷🇺 Russia',  rejected:'04 Apr 2026', reason:'Forged proof of address',  risk:'High',   resubmit:'No'  },
    { id:'KYC-2013', name:'Grace Ntumba',       country:'🇨🇩 Congo',   rejected:'03 Apr 2026', reason:'Illegible documents',      risk:'Medium', resubmit:'Yes' },
  ],

  documents: [
    { name:'Passport',         client:'James Harrington',  id:'KYC-2041', date:'08 Apr', type:'ID'      },
    { name:'Proof of Address', client:'James Harrington',  id:'KYC-2041', date:'08 Apr', type:'PoA'     },
    { name:'National ID',      client:'Amira El-Sayed',    id:'KYC-2040', date:'08 Apr', type:'ID'      },
    { name:'Bank Statement',   client:'Amira El-Sayed',    id:'KYC-2040', date:'08 Apr', type:'Finance' },
    { name:'Passport',         client:'Yuki Tanaka',       id:'KYC-2038', date:'07 Apr', type:'ID'      },
    { name:'Source of Funds',  client:'Yuki Tanaka',       id:'KYC-2038', date:'07 Apr', type:'Finance' },
    { name:'Passport',         client:'Dmitri Volkov',     id:'KYC-2037', date:'06 Apr', type:'ID'      },
    { name:'Bank Statement',   client:'Dmitri Volkov',     id:'KYC-2037', date:'06 Apr', type:'Finance' },
    { name:'Passport',         client:'Liu Wei',           id:'KYC-2033', date:'04 Apr', type:'ID'      },
    { name:'Source of Funds',  client:'Liu Wei',           id:'KYC-2033', date:'04 Apr', type:'Finance' },
    { name:'National ID',      client:'Fatima Al-Rashidi', id:'KYC-2034', date:'05 Apr', type:'ID'      },
  ],

  riskAccounts: [
    { name:'Viktor Sokolov',     country:'Russia', initials:'VS', score:94, flags:['Sanctions Match (OFAC)','PEP — Tier 1','High-value transfers','Restricted jurisdiction'] },
    { name:'Zhao Lei',           country:'China',  initials:'ZL', score:81, flags:['PEP screening fail','Politically exposed person','Unusual trading patterns'] },
    { name:'Dmitri Volkov',      country:'Russia', initials:'DV', score:74, flags:['High-risk jurisdiction','Unverified source of funds','Multiple nationality docs'] },
    { name:'Unknown Entity LLC', country:'Belize', initials:'UE', score:88, flags:['Shell company indicators','No beneficial owner declared','Offshore jurisdiction'] },
  ],

  activity: [
    { color:'green',  label:'Passport verified',       name:'Thomas Eriksson', time:'Today, 14:32' },
    { color:'red',    label:'Bank statement rejected',  name:'Viktor Sokolov',  time:'Today, 13:15' },
    { color:'yellow', label:'Source of funds flagged',  name:'Dmitri Volkov',   time:'Today, 11:48' },
    { color:'blue',   label:'ID submitted for review',  name:'Amira El-Sayed',  time:'Today, 10:20' },
    { color:'green',  label:'PoA approved',             name:'Ravi Patel',      time:'Yesterday, 17:05' },
  ],
};
