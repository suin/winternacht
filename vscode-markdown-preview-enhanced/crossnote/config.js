({
  katexConfig: {
    "macros": {}
  },

  mathjaxConfig: {
    "tex": {},
    "options": {},
    "loader": {}
  },

  // Winternacht — Mermaid theme
  // Use "base" theme via VS Code settings so themeVariables take full effect
  mermaidConfig: {
    startOnLoad: false,
    themeVariables: {
      darkMode: true,

      // ── Surface ──────────────────────────────────────────────
      background:        '#1A1917',   // neutral-950
      mainBkg:           '#242320',   // neutral-900
      secondaryColor:    '#2E2C29',
      tertiaryColor:     '#333128',

      // ── Primary node ─────────────────────────────────────────
      primaryColor:      '#242320',   // neutral-900
      primaryBorderColor:'#5F9EA8',   // accent-300
      primaryTextColor:  '#EDECEA',   // text-strong

      // ── Secondary node ───────────────────────────────────────
      secondaryBorderColor: '#4E8C95', // accent-400
      secondaryTextColor:   '#D6D3CE', // text

      // ── Tertiary node ────────────────────────────────────────
      tertiaryBorderColor: '#7A9E72',  // sage-300
      tertiaryTextColor:   '#D6D3CE',  // text

      // ── Lines & labels ───────────────────────────────────────
      lineColor:           '#6B6862',  // neutral-600
      textColor:           '#D6D3CE',  // text
      edgeLabelBackground: '#1A1917',  // neutral-950

      // ── Cluster / subgraph ───────────────────────────────────
      clusterBkg:          '#1F1E1C',
      clusterBorder:       '#5F9EA8',  // accent-300
      titleColor:          '#EDECEA',  // text-strong

      // ── Sequence diagram ─────────────────────────────────────
      actorBkg:            '#242320',  // neutral-900
      actorBorder:         '#5F9EA8',  // accent-300
      actorTextColor:      '#EDECEA',  // text-strong
      actorLineColor:      '#504D48',  // neutral-700
      signalColor:         '#BAB7B2',  // neutral-400
      signalTextColor:     '#D6D3CE',  // text
      labelBoxBkgColor:    '#1A1917',  // neutral-950
      labelBoxBorderColor: '#5F9EA8',  // accent-300
      labelTextColor:      '#D6D3CE',  // text
      loopTextColor:       '#D6D3CE',  // text
      noteBkgColor:        '#2A2F2E',
      noteTextColor:       '#D6D3CE',  // text
      noteBorderColor:     '#5F9EA8',  // accent-300
      activationBorderColor:'#5F9EA8', // accent-300
      activationBkgColor:  '#2A3032',

      // ── Git graph ────────────────────────────────────────────
      git0: '#5F9EA8',  // accent-300
      git1: '#7A9E72',  // sage-300
      git2: '#8A7EB0',  // lavender-300
      git3: '#B07888',  // rose-300
      git4: '#C29E5E',  // sand-300
      git5: '#6B8BBF',  // slate-300
      git6: '#6B9E8A',  // mint-300
      git7: '#B08A60',  // copper-300

      gitBranchLabel0: '#1A1917',
      gitBranchLabel1: '#1A1917',
      gitBranchLabel2: '#1A1917',
      gitBranchLabel3: '#1A1917',
      gitBranchLabel4: '#1A1917',
      gitBranchLabel5: '#1A1917',
      gitBranchLabel6: '#1A1917',
      gitBranchLabel7: '#1A1917',

      gitInv0: '#EDECEA',
      gitInv1: '#EDECEA',
      gitInv2: '#EDECEA',
      gitInv3: '#EDECEA',

      // ── Pie chart ────────────────────────────────────────────
      pie1: '#5F9EA8',  // accent-300
      pie2: '#7A9E72',  // sage-300
      pie3: '#8A7EB0',  // lavender-300
      pie4: '#C29E5E',  // sand-300
      pie5: '#B07888',  // rose-300
      pie6: '#6B8BBF',  // slate-300
      pie7: '#6B9E8A',  // mint-300
      pie8: '#B08A60',  // copper-300
      pie9: '#4E8C95',  // accent-400
      pie10: '#587850', // sage-500
      pie11: '#635788', // lavender-500
      pie12: '#8E7040', // sand-500

      pieSectionTextColor:  '#1A1917',
      pieLegendTextColor:   '#D6D3CE',
      pieStrokeColor:       '#1A1917',
      pieOuterStrokeColor:  '#1A1917',
      pieOpacity:           '0.9',

      // ── Gantt ────────────────────────────────────────────────
      gridColor:            '#333128',
      section0:             'rgba(95,158,168,0.06)',
      section1:             'rgba(122,158,114,0.05)',
      taskTextColor:        '#D6D3CE',
      taskTextOutsideColor: '#D6D3CE',
      taskTextLightColor:   '#EDECEA',
      doneTaskBkgColor:     '#3A3835',
      doneTaskBorderColor:  '#6B6862',
      activeTaskBkgColor:   'rgba(95,158,168,0.2)',
      activeTaskBorderColor:'#5F9EA8',
      taskBkgColor:         '#2E2C29',
      taskBorderColor:      '#504D48',
      critBkgColor:         'rgba(184,112,112,0.15)',
      critBorderColor:      '#B87070',
      todayLineColor:       '#5F9EA8',
    }
  },
})
