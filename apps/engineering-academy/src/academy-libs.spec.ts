/**
 * The Angular karma builder only discovers spec files under the app's
 * source root, so this entry pulls in the academy library specs. The specs
 * themselves stay co-located with the code they test.
 */
import '../../../libs/academy/content-model/src/lib/scoring.spec';
import '../../../libs/academy/content-model/src/lib/evaluation.spec';
import '../../../libs/academy/content-model/src/lib/ranks.spec';
import '../../../libs/academy/content-model/src/lib/meters.spec';
import '../../../libs/academy/content-model/src/lib/personas.spec';
import '../../../libs/academy/content/src/lib/content-integrity.spec';
import '../../../libs/academy/data-access/src/lib/persistence.service.spec';
import '../../../libs/academy/data-access/src/lib/speech-audio-cache.spec';
import '../../../libs/academy/data-access/src/lib/speech-text.spec';
import '../../../libs/academy/data-access/src/lib/speech.service.spec';
import '../../../libs/academy/data-access/src/lib/game-state.service.spec';
import '../../../libs/academy/data-access/src/lib/track-progress.service.spec';
import '../../../libs/academy/data-access/src/lib/mission-session.service.spec';
import '../../../libs/academy/data-access/src/lib/academy-review.service.spec';
import '../../../libs/academy/data-access/src/lib/learning-analytics.service.spec';
import '../../../libs/academy/challenges/src/lib/challenge-host/challenge-host.component.spec';
import '../../../libs/academy/ui/src/lib/code-viewer/syntax-highlight.spec';
import '../../../libs/academy/ui/src/lib/code-viewer/code-viewer.component.spec';
