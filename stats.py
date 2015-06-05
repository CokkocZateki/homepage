import calendar
import datetime
import json
import eveapi

with open('public/alliance.json', 'r+') as f:
    alliance_json = f.read()
    try:
        alliance_data = json.loads(alliance_json)
    except Exception as e:
        print(e)
        alliance_data = {
            'alliance_members': 0,
            'alliance_corps': 0
        }

    api = eveapi.EVEAPIConnection()

    alliance_list = api.eve.AllianceList()

    for alliance in alliance_list.alliances:
        if alliance.allianceID == 99002172:
            alliance_data['alliance_members'] = alliance.memberCount
            alliance_data['alliance_corps'] = len(alliance.memberCorporations)
            break

    f.seek(0)
    f.truncate()
    f.write(json.dumps(alliance_data))
