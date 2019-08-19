import * as _ from 'lodash';

export default function convertAttributesToMood(attributes) {
    let mood = {
        target_energy: 0,
        target_acousticness: 0,
        target_danceability: 0,
        target_valence: 0,
        mode: 0,
    };

    const map = {
        disgust: {
            add: [],
            subtract: ['target_acousticness', 'target_valence', 'target_energy'],
        },
        anger: {
            add: ['target_energy', 'target_danceability'],
            subtract: ['target_acousticness', 'target_valence'],
        },
        fear: {
            add: ['target_energy', 'target_acousticness'],
            subtract: ['mode', 'target_valence', 'target_danceability'],
        },
        sadness: {
            add: ['target_acousticness'],
            subtract: ['mode', 'target_valence', 'target_danceability', 'target_energy'],
        },
        smiling: {
            add: ['mode', 'target_valence', 'target_danceability', 'target_energy'],
            subtract: [],
        },
        surprise: {
            add: ['mode', 'target_valence', 'target_danceability', 'target_energy'],
            subtract: ['target_acousticness'],
        },
    };

    _.forEach(attributes, (attribute) => {
        _.forEach(_.keys(map), (emotion) => {
            if (!attribute[emotion]) return;
            if (attribute[emotion].value === 'true') {
                _.forEach(map[emotion].add, (add) => {
                    mood[add] += 1;
                });
                _.forEach(map[emotion].subtract, (subtract) => {
                    mood[subtract] -= 1;
                });
            }
        });
    });

    mood = _.mapValues(mood, (val) => {
        let weighted = val / attributes.length;
        weighted = weighted > 1 ? 1 : weighted;
        weighted = weighted < 0 ? 0 : weighted;
        return weighted;
    });
    mood.mode = mood.mode > 0.5 ? 1 : 0;
    return mood;
}
