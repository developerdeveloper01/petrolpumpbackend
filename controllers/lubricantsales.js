const lubricantsales = require("../models/lubricantsales");
const resp = require("../helpers/apiresponse")
exports.addlubricantsales= async (req, res) => {
  const {
    dealer_name1,
    date,
    lube_grade,
    total_pieces_available,
    no_of_pieces_sold,
    selling_price,
    dsm,
    mode_of_pyament,
    gst,
    discount
  } = req.body;

  const newlubricantsales= new lubricantsales({
    dealer_name1:dealer_name1,
    date: date,
    lube_grade : lube_grade,
    total_pieces_available: total_pieces_available,
    no_of_pieces_sold: no_of_pieces_sold,
    selling_price:selling_price,
    dsm:dsm,
    mode_of_pyament:mode_of_pyament,
    gst:gst,
    discount:discount
  });


  newlubricantsales .save()
      .then((data) => {
        res.status(200).json({
          status: true,
          msg: "success",
          data: data,
        });
      })
      .catch((error) => {
        res.status(400).json({
          status: false,
          msg: "error",
          error: error,
        });
      });
  };

  exports.alllubricantsales = async (req, res) => {
    await lubricantsales
      .find().populate("dealer_name1").populate([
          {
              path:'lube_grade',
              select :'grade',

          }
      ]).populate([
        {
            path:'total_pieces_available',
            select :'no_of_pieces',

        }
    ]).populate([
        {
            path:'mode_of_pyament',
            select :'select_mode',
        }
    ]).populate('dsm')
      .sort({ sortorder: 1 })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  
  exports.getonelubricantsales = async (req, res) => {
    await lubricantsales
      .findOne({ _id: req.params.id }).populate("dealer_name1").populate([
        {
            path:'lube_grade',
            select :'grade',

        }
    ]).populate([
      {
          path:'total_pieces_available',
          select :'no_of_pieces',

      }
  ]).populate([
      {
          path:'mode_of_pyament',
          select :'select_mode',

      }
  ]).populate('dsm')
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };

  exports.deletelubricantsales= async (req, res) => {
    await lubricantsales.deleteOne({ _id: req.params.id })
      .then((data) => resp.deleter(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  
  
  exports.updatelubricantsales = async (req, res) => {
    console.log(req.params.id);
  await lubricantsales
   
      .findOneAndUpdate(
        {
          _id: req.params.id,
        //  console.log(req.params._id);
      },
        {
          $set: req.body,
        },
        { new: true }
      )
      
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
      console.log(req.params._id);
  };
  