//  Lines



export function generateLines(movieName: string, translator: string, technique: string) {
    const lines = [
        `فـیـلـمی ژێـرنـووسـکـراوی کـوردی\\N{\\c&HFFFF80&} « ${movieName} »{\\c}`,
        `وەرگـێـڕان\\N{\\c&HFFFF80&}${translator}{\\c}`,
        `تـەکـنـیـک\\N{\\c&HFFFF80&}${technique}{\\c}`,
        `مـافـی ئـەم بـەرهـەمـە و ژێـرنـووسـەکـەی پـارێزراوە بۆ ماڵـپـەڕی کـوردسـەبـتایـتڵ\\N{\\c&HFFFF80&}Www.KurdSubtitle.Net{\\c}`,
    ];

    return lines
}
