class Handler {
    public static catchErrors(fn) {
        return function(req, res, next) {
          return fn(req, res, next).catch(err => {
            return res.status(500).json({ status: 500, message: err.message });
          }).then( ({data, errors}) => {
            if(errors) {
              return res.status(400).json({ status: 400, errors });
            }
            return res.status(200).json({ status: 200, data });
          });
        };
    }
    public static notFound = (req, res) => {
        return res.status(404).json({ status: 404, message: 'Not Found' });
    };
}

export default Handler;