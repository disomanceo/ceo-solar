from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
import requests
from PIL import Image
root=Path('dist/textures');root.mkdir(exist_ok=True)
names=['sun','mercury','venus_atmosphere','mars','jupiter','saturn','saturn_ring_alpha','uranus','neptune','moon','earth_clouds','stars_milky_way']
def fetch(name):
    filename='2k_'+name+('.png' if name=='saturn_ring_alpha' else '.jpg')
    response=requests.get('https://media.githubusercontent.com/media/TanvirAhmedArnab/SolarSystem/main/SourceAssets/ThirdParty/Textures/SolarSystemScope/'+filename,timeout=90)
    response.raise_for_status()
    path=root/filename;path.write_bytes(response.content)
    with Image.open(path) as im: im.verify()
    return filename+' '+str(len(response.content))
with ThreadPoolExecutor(max_workers=4) as pool:
    for result in pool.map(fetch,names):print(result)
