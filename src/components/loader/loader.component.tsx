interface LoaderProps {
  classNameWrapper: string
  classNameLoader: string
  haveLabel: boolean
  label: string
}

const Loader = ({classNameLoader, classNameWrapper, haveLabel, label}: LoaderProps) => (
    <div className={`"flex flex-col gap-4 justify-center items-center ${classNameWrapper}`}>
      <div className={`animate-spin rounded-full border-8 border-foreground border-t-transparent w-12 h-12 ${classNameLoader}`}>
      </div>
      {haveLabel && <h1>{label}</h1>}
    </div>
  );
  
  export default Loader;