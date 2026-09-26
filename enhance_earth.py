from PIL import Image
from io import BytesIO
import requests
url='https://assets.science.nasa.gov/content/dam/science/esd/eo/images/bmng/bmng-base/january/world.200401.3x5400x2700.jpg'
source=Image.open(BytesIO(requests.get(url,timeout=90).content)).convert('RGB')
source=source.resize((2048,1024),Image.Resampling.LANCZOS)
pixels=source.load()
for y in range(source.height):
    for x in range(source.width):
        r,g,b=pixels[x,y]
        # The NASA base map's dark, blue ocean pixels retain geography and coastlines.
        if b>r*1.12 and b>g*1.04 and r<135 and g<145:
            pixels[x,y]=(min(255,int(r*.72+12)),min(255,int(g*1.4+35)),min(255,int(b*1.65+50)))
source.save('dist/earth-blue-marble.jpg',quality=89,optimize=True)
print(source.size)
