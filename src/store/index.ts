import useInputWordCountStore from "./inputWordCount";
import useOutputWordCountStore from "./outputWordCount";
import useInput from "./input";
import useOutput from "./output";
import useTextLength from "./textLength";
import useSentenceCount from "./sentenceCount";
import useLoading from "./loading";
import useError from "./error";

import useInputText from "./translator/inputText";
import useOutputText from "./translator/outputText";
import useInputLang from "./translator/inputLang";
import useOutputLang from "./translator/outputLang";
import useIsLoading from "./translator/loading";
import useTransInputWordCount from "./translator/transInputWordCount";
import useTransOutputWordCount from "./translator/transOutputWordCount";

import useAudioBlob from "./audio-generator/audio";
import useAudioIsLoading from "./audio-generator/loading";
import useAudioInputText from "./audio-generator/input";
import useAudioURL from "./audio-generator/output";
import usePlaying from "./audio-generator/play";

export {
    useInputWordCountStore,
    useOutputWordCountStore,
    useInput,
    useOutput,
    useTextLength,
    useSentenceCount,
    useLoading,
    useError,
    useInputText,
    useOutputText,
    useInputLang,
    useOutputLang,
    useIsLoading,
    useTransInputWordCount,
    useTransOutputWordCount,
    useAudioBlob,
    useAudioIsLoading,
    useAudioInputText,
    useAudioURL,
    usePlaying,
}