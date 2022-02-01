import * as _ from "lodash";
import axios from "axios";

import {
  TRACK_LOAD,
  TRACK_PLAY,
  TRACK_PAUSE,
  TRACK_STOP,
  TRACK_SEEK,
  TRACK_PLAYING,
  SET_ANALYSER
} from "../actions/types";

// =============================================================================

export const trackLoad = (track) => async (dispatch, getState, api) => {
  dispatch({
    type: TRACK_LOAD,
    payload: track
  });
}

export const trackPlay = (track) => async (dispatch, getState, api) => {
  dispatch({
    type: TRACK_PLAY,
    payload: track
  });
}

export const trackPause = (track) => async (dispatch, getState, api) => {
  dispatch({
    type: TRACK_PAUSE,
    payload: track
  });
}

export const trackStop = (track) => async (dispatch, getState, api) => {
  dispatch({
    type: TRACK_STOP,
    payload: track
  });
}

export const trackSeek = (seconds, track) => async (dispatch, getState, api) => {
  dispatch({
    type: TRACK_SEEK,
    seekToSeconds: seconds,
    payload: track
  });
}

export const trackPlaying = (id, currentTime, metadata) => async (dispatch, getState, api) => {
  dispatch({
    type: TRACK_PLAYING,
    id: id,
    currentTime: currentTime,
    metadata: metadata
  });
}

export const setAnalyser = (analyser) => async (dispatch, getState, api) => {
  dispatch({
    type: SET_ANALYSER,
    payload: analyser
  });
}
