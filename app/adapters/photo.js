import RESTAdapter from '@ember-data/adapter/json-api';
import ENV from "unmute/config/environment";

export default class PhotoAdapter extends RESTAdapter {
  host = "https://api.airtable.com";

  namespace = "v0/appnt24WLhLFVyc6j"

  headers = {
    "Accept": "application/json",
    "Authorization": `Bearer ${ENV.AIRTABLE_API_KEY}`,
  }
}
