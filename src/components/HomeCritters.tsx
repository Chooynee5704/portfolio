import meo1 from '../assets/meo1.webp';
import meo2 from '../assets/meo2.webp';
import meo3 from '../assets/meo3.webp';
import meo4 from '../assets/meo4.webp';

const critters = [meo1, meo2, meo3, meo4];

const HomeCritters = () => {
    const track = [...critters, ...critters];

    return (
        <div className="mt-6 relative overflow-hidden">
            <div className="cat-marquee">
                <div className="cat-track">
                    {track.map((src, index) => (
                        <div className="cat-item" key={`cat-row-1-${index}`}>
                            <img src={src} alt={`Pet ${index + 1}`} loading="lazy" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomeCritters;
