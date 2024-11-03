export type IconProps = { name: string;family: string; selected?: boolean };

export function Icon({ name, selected, family }: IconProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "2px",
      }}
    >
      {selected && "Selected: "}
      {name}

        {family === 'brands' ? (
            <i className={`fa-brands fa-${name}`}/>
        ) : (
            <>
                <i className={`fa-solid fa-${name}`}/>
                <i className={`fa-regular fa-${name}`}/>
                <i className={`fa-light fa-${name}`}/>
                <i className={`fa-thin fa-${name}`}/>
            </>
        )}
    </div>
  )
      ;
}
