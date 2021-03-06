const assert = require('assert');

const assertParam = require('../util/assertParam');
const RestUtil = require('../util/RestUtil');

/*
  https://demo.microstrategy.com/MicroStrategyLibrary/api-docs/index.html#/Dossiers%20and%20Documents
*/
module.exports = class RestTopic extends RestUtil {
  _getBase() {
    return 'dossiers';
  }

  getDossierDefinition(dossierId) {
    assert(dossierId, 'No dossierId provided');

    return this._makeRequest(`${this._getBase()}/${dossierId}/definition`, false, 'GET', this.getProjectHeader())
    .then(result => {
      if (result.status != 200) {
        throw result;
      };
      return result.data;
    });
  }

  createDossierInstance(dossierId, body, asyncMode) {
    assert(dossierId, 'No dossierId provided');

    if (asyncMode) {
      sessionState['X-MSTR-AsyncMode'] = true;
    }
    return this._makeRequest(`${this._getBase()}/${dossierId}/instances`, body, 'POST', this.getProjectHeader())
    .then(result => {
      if (result.status != 201) {
        throw result;
      };
      return result.data;
    });
  }

  getDossierVisualization(params) {
    assertParam(params);
    assertParam(params, 'dossierId');
    assertParam(params, 'instanceId');
    assertParam(params, 'chapterKey');
    assertParam(params, 'visualizationKey');

    const endpoint = `${this._getBase()}/${params.dossierId}/instances/${params.instanceId}/chapters/${params.chapterKey}/visualizations/${params.visualizationKey}`;
    return this._makeRequest(endpoint, params, 'GET', this.getProjectHeader())
    .then(result => {
      if (result.status != 200) {
        throw result;
      };
      return result.data;
    });
  }

}