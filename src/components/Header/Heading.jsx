
const Heading = ({title}) => {
    return (
        <div className="text-center mb-8">
        <span className="text-xl md:text-2xl lg:text-4xl font-semibold p-2 border-b-2">
            {title}
        </span>
        </div>
    );
};

export default Heading;