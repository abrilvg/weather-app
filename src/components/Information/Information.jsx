import Image from "next/image";

function Information({ weather }) {
    const {
        current: { temp_c, condition },
        location: { country, name, tz_id, localtime },
    } = weather;

    return (
        <section>
            <h2 className="text-center text-xl md:text-2xl py-2">
                Current Weather
            </h2>
            <Image
                src={`https:${condition?.icon}`}
                alt="Weather condition icon"
                width={64}
                height={64}
                className="mx-auto my-0"
            />

            <div className="flex flex-col gap-3 items-center">
                <h3>
                    {name}, {country}
                </h3>
                {/* Here we can show °F or °C*/}
                <p>{temp_c}°C</p>

                <p>{condition.text}</p>

                <p>{tz_id}</p>
                <p>{localtime}</p>
            </div>
        </section>
    );
}

export default Information;
